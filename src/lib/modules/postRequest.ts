// import axios from "axios";
import { updateResponseStore } from "$lib/stores/responseStore";
import { invoke } from "@tauri-apps/api";

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
		// const response = await axios({
		// 	method: "post",
		// 	url: url,
		// 	data: json,
		// 	responseType: "text",
		// });
		// console.log(response.data);
		// updateResponseStore(
		// 	"POST request at URL '" + url + "' was successful."
		// );

		const data = await invoke("post", { url: url, json: json });
		// console.log(data);

		const message = "POST request at URL '" + url + "' was successful";

		if (data === "") {
			updateResponseStore(
				message + ". There was no additional response."
			);
		} else {
			updateResponseStore(message + " with response: " + String(data));
		}
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
	}
}
