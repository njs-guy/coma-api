import axios from "axios";
import { updateResponseStore } from "$lib/stores/responseStore";

export default async function getRequest(url: string) {
	// TODO: Put https:// at the beginning if it's missing
	// TODO: Fix CORS issues

	try {
		const response = await axios({
			method: "get",
			url: url,
			responseType: "text",
		});
		console.log(response.data);
		updateResponseStore(response.data);
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
	}
}
