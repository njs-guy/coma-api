import { invoke } from "@tauri-apps/api";
import { updateResponseStore } from "$lib/stores/responseStore";
import {
	updateResponseSizeStore,
	updateResponseStatusStore,
	updateResponseTimeStore,
} from "$lib/stores/responseStatusStore";
import { createRequestUrl, type RequestJSON } from "./requestTypes";

export default async function getRequest(url: string, protocol = "HTTPS") {
	const getUrl = createRequestUrl(url, protocol);

	try {
		const data = (await invoke("get", { url: getUrl })) as RequestJSON;
		updateResponseStore(data.body);
		updateResponseStatusStore(data.status.code);
		updateResponseTimeStore(data.status.time);
		updateResponseSizeStore(data.status.size);
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
		updateResponseStatusStore("400");
		updateResponseTimeStore("--");
		updateResponseSizeStore("--");
	}
}
