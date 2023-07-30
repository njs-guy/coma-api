<script lang="ts">
import { onMount } from "svelte";

const tabs = {
	general: "general",
	something: "something",
	about: "about",
};
// let currentTab: string;

function hideTabs() {
	for (const tab in tabs) {
		const value: string = tabs[tab];
		const tabName = value + "-settings";

		const t = document.getElementById(tabName);
		if (t !== null) {
			// t.style.display = "none";
			t.setAttribute("hidden", "");
		}
	}
}

function changeTab(newTab: string) {
	hideTabs();

	const tab = document.getElementById(newTab + "-settings");
	if (tab !== null) {
		// tab.style.display = "visible";
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
						on:click={() => changeTab("general")}
						on:keypress={() => changeTab("general")}
					>
						General
					</div>
				</li>
				<li>
					<div
						role="button"
						tabindex="0"
						on:click={() => changeTab("something")}
						on:keypress={() => changeTab("something")}
					>
						Something
					</div>
				</li>
				<li>
					<div
						role="button"
						tabindex="0"
						on:click={() => changeTab("about")}
						on:keypress={() => changeTab("about")}
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
