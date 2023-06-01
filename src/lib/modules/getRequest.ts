import axios from "axios";
import { invoke } from "@tauri-apps/api";
import { updateResponseStore } from "$lib/stores/responseStore";
import { updateResponseStatusStore } from "$lib/stores/responseStatusStore";

// export default async function getRequest(url: string) {
// 	// TODO: Put https:// at the beginning if it's missing
// 	// TODO: Fix CORS issues

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
	// TODO: update status store

	try {
		const data = (await invoke("get", { url: url })) as string;
		updateResponseStore(data);
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
	}
}
