<script lang="ts">
import { onMount } from "svelte";
import { changeSettingsTab, getSettingsPages } from "$lib/modules/showPage";
import AboutPage from "./AboutPage.svelte";
import GeneralSettingsPage from "./GeneralSettingsPage.svelte";
import SettingsTab from "../settings/SettingsTab.svelte";

const settingsTabs = getSettingsPages();

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
		class="modal-box p-2 h-full max-h-96"
	>
		<div class="flex flex-row">
			<ul class="flex flex-col menu w-auto rounded-box gap-1">
				{#each settingsTabs as tab}
					<li>
						<SettingsTab
							label={tab}
							pageName={tab}
						/>
					</li>
				{/each}
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
					id="about-settings"
				>
					<AboutPage />
				</div>
			</div>
		</div>
		<button
			class="btn btn-sm btn-circle bg-base-300 font-bold fixed top-2 right-2"
			>X</button
		>
	</form>
</dialog>

<style scoped>
.settings {
	@apply p-2;
}
</style>
