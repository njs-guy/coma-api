import { writable } from "svelte/store";
import { updateResponseStore } from "./responseStore";

const defaultValue = "--";

export const responseStatusStore = writable(defaultValue);
export const responseTimeStore = writable(defaultValue);
export const responseSizeStore = writable(defaultValue);

// Takes an HTTP status such as 200.
export function updateResponseStatusStore(newValue: string) {
	responseStatusStore.update(() => {
		try {
			const status = parseInt(newValue);
			const statusText = getStatusText(status);
			return status + " " + statusText;
		} catch (error) {
			console.log(error);
			updateResponseStore(String(error));
			return "";
		}
	});
}
export function updateResponseTimeStore(newValue: string) {
	responseTimeStore.update(() => newValue);
}
export function updateResponseSizeStore(newValue: string) {
	responseSizeStore.update(() => newValue);
}

export function getStatusText(status: number) {
	switch (status) {
		case 200:
			return "OK";
		default:
			return "";
	}
}

export function resetStatus() {
	updateResponseStatusStore("400");
	updateResponseTimeStore(defaultValue);
	updateResponseSizeStore(defaultValue);
}

export function resetStatusWithErrorMessage(error: string) {
	resetStatus();
	updateResponseStore(error);
}
