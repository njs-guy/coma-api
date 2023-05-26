import { writable } from "svelte/store";

export const responseStatusStore = writable("");
export const responseTimeStore = writable("");
export const responseSizeStore = writable("");

export function updateResponseStatusStore(newValue: string) {
	responseStatusStore.update(() => newValue);
}
export function updateResponseTimeStore(newValue: string) {
	responseTimeStore.update(() => newValue);
}
export function updateResponseSizeStore(newValue: string) {
	responseSizeStore.update(() => newValue);
}
