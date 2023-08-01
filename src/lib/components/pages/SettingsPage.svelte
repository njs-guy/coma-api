<script lang="ts">
import { onMount } from "svelte";
import { changeSettingsTab, settingPages } from "$lib/modules/showPage";
import AboutPage from "./AboutPage.svelte";
import GeneralSettingsPage from "./GeneralSettingsPage.svelte";

onMount(() => {
	changeSettingsTab("general");
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
						on:click={() => changeSettingsTab(settingPages.general)}
						on:keypress={() =>
							changeSettingsTab(settingPages.general)}
					>
						General
					</div>
				</li>
				<li>
					<div
						role="button"
						tabindex="0"
						on:click={() =>
							changeSettingsTab(settingPages.something)}
						on:keypress={() =>
							changeSettingsTab(settingPages.something)}
					>
						Something
					</div>
				</li>
				<li>
					<div
						role="button"
						tabindex="0"
						on:click={() => changeSettingsTab(settingPages.about)}
						on:keypress={() =>
							changeSettingsTab(settingPages.about)}
					>
						About
					</div>
				</li>
			</ul>
			<!-- Pages to be shown/hidden -->
			<div class="w-full max-w-sm">
				<div
					class="settings"
					id="general-settings"
				>
					<GeneralSettingsPage />
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
					<AboutPage />
				</div>
			</div>
		</div>
		<button class="btn btn-sm btn-error">Close</button>
	</form>
</dialog>

<style scoped>
.settings {
	@apply p-2;
}
</style>
