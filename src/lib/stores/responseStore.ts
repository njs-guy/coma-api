import { writable } from "svelte/store";

export const responseStore = writable("");

export function updateResponseStore(newValue: string) {
	responseStore.update(() => newValue);
}
