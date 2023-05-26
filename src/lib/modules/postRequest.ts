import axios from "axios";
import { updateResponseStore } from "$lib/stores/responseStore";

export default async function postRequest(url: string, data: string) {
	let json: JSON;
	try {
		json = JSON.parse(data);
	} catch (error) {
		console.log("what");
		console.error(error);
		updateResponseStore(String(error));
		return; // Cancel the request since the json is invalid.
	}

	try {
		const response = await axios({
			method: "post",
			url: url,
			data: json,
			responseType: "text",
		});
		console.log(response.data);
		updateResponseStore(
			"POST request at URL '" + url + "' was successful."
		);
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
	}
}
