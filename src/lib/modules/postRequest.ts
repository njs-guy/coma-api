import { invoke } from "@tauri-apps/api";
import { updateResponseStore } from "$lib/stores/responseStore";
import {
	updateResponseSizeStore,
	updateResponseStatusStore,
	updateResponseTimeStore,
} from "$lib/stores/responseStatusStore";
import type { RequestJSON } from "./requestTypes";

export default async function postRequest(url: string, data: string) {
	let json: JSON;
	try {
		json = JSON.parse(data);
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
		return; // Cancel the request since the json is invalid.
	}

	try {
		const data = (await invoke("post", {
			url: url,
			json: json,
		})) as RequestJSON;
		// console.log(data);

		const message = "POST request at URL '" + url + "' was successful";

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
		updateResponseStore(String(error));
		updateResponseStatusStore("400");
		updateResponseTimeStore("--");
		updateResponseSizeStore("--");
	}
}
