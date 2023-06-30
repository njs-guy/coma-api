import { invoke } from "@tauri-apps/api";
import { updateResponseStore } from "$lib/stores/responseStore";
import {
	resetStatus,
	resetStatusWithErrorMessage,
	updateResponseSizeStore,
	updateResponseStatusStore,
	updateResponseTimeStore,
} from "$lib/stores/responseStatusStore";
import { createRequestUrl, type RequestJSON } from "./requestTypes";

export default async function getRequest(url: string, protocol = "HTTP") {
	if (url === undefined || url === "") {
		updateResponseStore("No request was sent. Please input a url.");
		resetStatus();
		return; // Do not send an obviously invalid request.
	}

	const getUrl = createRequestUrl(url, protocol);

	console.log("Sending a GET request to " + getUrl + "...");

	try {
		const data = (await invoke("get", { url: getUrl })) as RequestJSON;
		updateResponseStore(data.body);
		updateResponseStatusStore(data.status.code);
		updateResponseTimeStore(data.status.time);
		updateResponseSizeStore(data.status.size);
	} catch (error) {
		console.error(error);
		resetStatusWithErrorMessage(String(error));
	}
}
