import { invoke } from "@tauri-apps/api";
import { updateResponseStore } from "$lib/stores/responseStore";
import {
	updateResponseSizeStore,
	updateResponseStatusStore,
	updateResponseTimeStore,
} from "$lib/stores/responseStatusStore";
import type { RequestJSON } from "./requestTypes";

export default async function getRequest(url: string) {
	// TODO: Put https:// at the beginning if it's missing
	// TODO: Fix CORS issues

	try {
		const data = (await invoke("get", { url: url })) as RequestJSON;
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
