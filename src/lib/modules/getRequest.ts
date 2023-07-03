import { invoke } from "@tauri-apps/api";
import { updateResponseStore } from "$lib/stores/responseStore";
import {
	resetStatus,
	resetStatusWithErrorMessage,
	updateResponseSizeStore,
	updateResponseStatusStore,
	updateResponseTimeStore,
} from "$lib/stores/responseStatusStore";
import type { RequestJSON } from "./requestTypes";

export default async function getRequest(url: string) {
	if (url === undefined || url === "") {
		updateResponseStore("No request was sent. Please input a url.");
		resetStatus();
		return; // Do not send an obviously invalid request.
	}

	console.log("Sending a GET request to " + url + "...");

	try {
		const data = (await invoke("get", { url: url })) as RequestJSON;
		updateResponseStore(data.body);
		updateResponseStatusStore(data.status.code);
		updateResponseTimeStore(data.status.time);
		updateResponseSizeStore(data.status.size);
	} catch (error) {
		console.error(error);
		resetStatusWithErrorMessage(String(error));
	}
}
