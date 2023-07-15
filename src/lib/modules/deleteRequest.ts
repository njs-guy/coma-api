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

export default async function deleteRequest(url: string) {
	if (url === undefined || url === "") {
		updateResponseStore("No request was sent. Please input a url.");
		resetStatus();
		return; // Do not send an obviously invalid request.
	}

	console.log("Sending a DELETE request to " + url + "...");

	try {
		const data = (await invoke("delete", { url: url })) as RequestJSON;

		// TODO: Say response was successful only if status was 200.
		const message = "DELETE request at URL '" + url + "' was sent";
		if (data.body === "") {
			updateResponseStore(
				message + ". There was no additional response."
			);
		} else {
			updateResponseStore(message + " with response: " + data.body);
		}

		updateResponseStatusStore(data.status.code);
		updateResponseTimeStore(data.status.time);
		updateResponseSizeStore(data.status.size);
	} catch (error) {
		console.error(error);
		resetStatusWithErrorMessage(String(error));
	}
}
