// import axios from "axios";
import { invoke } from "@tauri-apps/api";
import { updateResponseStore } from "$lib/stores/responseStore";
import {
	updateResponseSizeStore,
	updateResponseStatusStore,
	updateResponseTimeStore,
} from "$lib/stores/responseStatusStore";

// export default async function getRequest(url: string) {
// 	try {
// 		const response = await axios({
// 			method: "get",
// 			url: url,
// 			responseType: "text",
// 		});
// 		console.log(response.data);
// 		updateResponseStore(response.data);
// 		updateResponseStatusStore(String(response.status));
// 	} catch (error) {
// 		console.error(error);
// 		updateResponseStore(String(error));
// 	}
// }

export default async function getRequest(url: string) {
	// TODO: fix JSON type errors
	// TODO: Put https:// at the beginning if it's missing
	// TODO: Fix CORS issues

	try {
		const data = (await invoke("get", { url: url })) as JSON;
		updateResponseStore(data.body);
		updateResponseStatusStore(data.status.code);
		updateResponseTimeStore(data.status.time);
		updateResponseSizeStore(data.status.size);
		// console.log(data["body"]);
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
	}
}
