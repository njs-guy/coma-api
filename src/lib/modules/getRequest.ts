import { updateResponseStore } from "$lib/stores/responseStore";
import axios from "axios";

export default async function getRequest(url: string) {
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
