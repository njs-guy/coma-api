import { writable } from "svelte/store";

export const alertStore = writable("");

export function updateAlertStore(newValue: string) {
	alertStore.update(() => newValue);
}

export function showAlertBar(message: string) {
	const alertBar = document.getElementById("alert-bar");

	if (alertBar !== null) {
		updateAlertStore(message);
		alertBar.style.visibility = "visible";
	}
}

export function hideAlertBar() {
	const alertBar = document.getElementById("alert-bar");

	if (alertBar !== null) {
		alertBar.style.visibility = "hidden";
	}
}

export function showAlertBarTemp(message: string, seconds: number) {
	showAlertBar(message);

	// Hide Alert Bar after x seconds
	setTimeout(() => {
		hideAlertBar();
	}, seconds * 1000);
}
