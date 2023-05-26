import axios from "axios";
import { updateResponseStore } from "$lib/stores/responseStore";

export default async function postRequest(url: string, data: JSON) {
	try {
		const response = await axios({
			method: "post",
			url: url,
			data: data,
			responseType: "text",
		});
		console.log(response.data);
		updateResponseStore("POST request successful.");
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
	}
}
