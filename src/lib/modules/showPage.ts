export const settingPages = {
	general: "general",
	about: "about",
};

export function showSettingsPage() {
	console.log("show settings");

	const settingsPage = document.getElementById(
		"settings-page"
	) as HTMLDialogElement;

	if (settingsPage !== null) {
		settingsPage.showModal();
	}
}

export function hideSettingsTabs() {
	const tabs = [settingPages.general, settingPages.about];

	for (const tab in tabs) {
		const value: string = tabs[tab];
		const tabName = value + "-settings";

		const t = document.getElementById(tabName);
		if (t !== null) {
			t.setAttribute("hidden", "");
		}
	}
}

export function changeSettingsTab(newTab: string) {
	hideSettingsTabs();

	const tab = document.getElementById(newTab + "-settings");
	if (tab !== null) {
		tab.removeAttribute("hidden");
	}
}
