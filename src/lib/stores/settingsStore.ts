import { writable } from "svelte/store";

export const defaultSavePath = writable("");
export const dontAskWhereToSaveTextFiles = writable(false);
export const requestTimeout = writable(10000);
export const maxResponseSize = writable(50);

export function updateResponse(newValue: string) {
	defaultSavePath.update(() => newValue);
}

export function updateDontAskWhereToSaveTextFiles(newValue: boolean) {
	dontAskWhereToSaveTextFiles.update(() => newValue);
}
export function updateRequestTimeout(newValue: number) {
	requestTimeout.update(() => newValue);
}
export function updateMaxResponseSize(newValue: number) {
	maxResponseSize.update(() => newValue);
}
