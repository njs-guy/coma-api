<script lang="ts">
import { onMount } from "svelte";

const settingPages = {
	general: "general",
	something: "something",
	about: "about",
};

function hideTabs() {
	const tabs = [
		settingPages.general,
		settingPages.something,
		settingPages.about,
	];

	for (const tab in tabs) {
		const value: string = tabs[tab];
		const tabName = value + "-settings";

		const t = document.getElementById(tabName);
		if (t !== null) {
			t.setAttribute("hidden", "");
		}
	}
}

function changeTab(newTab: string) {
	hideTabs();

	const tab = document.getElementById(newTab + "-settings");
	if (tab !== null) {
		tab.removeAttribute("hidden");
	}
}

onMount(() => {
	changeTab("general");
});
</script>

<dialog
	class="modal"
	id="settings-page"
>
	<form
		method="dialog"
		class="modal-box p-2"
	>
		<div class="flex flex-row">
			<ul class="flex flex-col menu bg-base-200 w-auto rounded-box">
				<li>
					<div
						role="button"
						tabindex="0"
						on:click={() => changeTab(settingPages.general)}
						on:keypress={() => changeTab(settingPages.general)}
					>
						General
					</div>
				</li>
				<li>
					<div
						role="button"
						tabindex="0"
						on:click={() => changeTab(settingPages.something)}
						on:keypress={() => changeTab(settingPages.something)}
					>
						Something
					</div>
				</li>
				<li>
					<div
						role="button"
						tabindex="0"
						on:click={() => changeTab(settingPages.about)}
						on:keypress={() => changeTab(settingPages.about)}
					>
						About
					</div>
				</li>
			</ul>
			<div
				class="settings"
				id="general-settings"
			>
				<p>General</p>
			</div>
			<div
				class="settings"
				id="something-settings"
			>
				<p>Something else</p>
			</div>
			<div
				class="settings"
				id="about-settings"
			>
				<p>About</p>
			</div>
		</div>
		<button class="btn btn-sm btn-error">Close</button>
	</form>
</dialog>
