<script lang="ts">
import { changeSettingsTab } from "$lib/modules/showPage";

export let label: string;
export let pageName: string;
</script>

<div
	role="button"
	tabindex="0"
	class="settings-tab-label"
	on:click={() => changeSettingsTab(pageName)}
	on:keypress={() => changeSettingsTab(pageName)}
>
	{label}
</div>

<style scoped>
.settings-tab-label {
	text-transform: capitalize;
}
</style>
