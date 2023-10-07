<script lang="ts">
import NumberInput from "../settings/NumberInput.svelte";
import TextInput from "../settings/TextInput.svelte";
import Toggle from "../settings/Toggle.svelte";
</script>

<div class="general-settings-page flex flex-col gap-3">
	<h2 class="settings-label">General</h2>
	<TextInput label="Default save path" />
	<Toggle
		label="Don't ask where to save text files"
		description="Text files will be saved to the default save path."
		checked={false}
	/>
	<NumberInput
		label="Request timeout"
		description="Max time in milliseconds to wait before a request times out. Set to 0 for unlimited."
		min={0}
		max={100000}
		defaultValue={10000}
	/>
	<NumberInput
		label="Max response size"
		description="Maximum size for responses in MB. Set to 0 for unlimited."
		min={0}
		max={1000}
		defaultValue={50}
	/>
</div>
