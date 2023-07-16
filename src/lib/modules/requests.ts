import { invoke } from "@tauri-apps/api";
import { updateResponseStore } from "$lib/stores/responseStore";
import {
	resetStatus,
	resetStatusWithErrorMessage,
	updateResponseSizeStore,
	updateResponseStatusStore,
	updateResponseTimeStore,
} from "$lib/stores/responseStatusStore";

export interface RequestJSON {
	body: string;
	status: {
		time: string;
		code: string;
		size: string;
	};
}

export const reqMethod = {
	GET: "get",
	POST: "post",
	PUT: "put",
	DELETE: "delete",
};

export const protocolType = {
	Other: "",
	HTTP: "http",
	HTTPS: "https",
};

export function createRequestUrl(url: string, protocol: string) {
	let requestUrl: string;

	if (protocol === "") {
		requestUrl = url;
	} else {
		requestUrl = protocol + "://" + url;
	}

	return requestUrl;
}

function noUrlMsg() {
	updateResponseStore("No request was sent. Please input a url.");
	resetStatus();
	return; // Do not send an obviously invalid request.
}

function noJsonMsg() {
	updateResponseStore("No request was sent. Please input JSON data to send.");
	resetStatus();
	return; // Do not send an obviously invalid request.
}

export async function sendRequest(method: string, url: string) {
	if (url === undefined || url === "") {
		noUrlMsg();
	}

	console.log("Sending a " + method + " request to " + url + "...");

	try {
		const data = (await invoke(method, { url: url })) as RequestJSON;
		updateResponseStore(data.body);
		updateResponseStatusStore(data.status.code);
		updateResponseTimeStore(data.status.time);
		updateResponseSizeStore(data.status.size);
	} catch (error) {
		console.error(error);
		resetStatusWithErrorMessage(String(error));
	}
}

export async function sendRequestJson(
	method: string,
	url: string,
	data: string
) {
	if (url === undefined || url === "") {
		noUrlMsg();
	}

	if (data === undefined || data === "") {
		noJsonMsg();
	}

	let json: JSON;
	try {
		json = JSON.parse(data);
	} catch (error) {
		console.error(error);
		updateResponseStore(String(error));
		return; // Cancel the request since the json is invalid.
	}

	console.log("Sending a " + method + " request to " + url + "...");

	try {
		const data = (await invoke(method, {
			url: url,
			json: json,
		})) as RequestJSON;
		// console.log(data);

		// TODO: Say response was successful only if status was 200.
		const message = method + " request at URL '" + url + "' was sent";

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
