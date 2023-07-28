export function showSettingsPage() {
	console.log("show settings");

	const settingsPage = document.getElementById(
		"settings-page"
	) as HTMLDialogElement;

	if (settingsPage !== null) {
		settingsPage.showModal();
	}
}
