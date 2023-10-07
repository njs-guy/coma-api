<script lang="ts">
export let label: string;
export let description = "";
</script>

<div class="w-full flex flex-col">
	<p class="settings-label">{label}</p>
	<p class="desc-text">{description}</p>
	<input
		class="input input-bordered input-sm w-full bg-deep"
		type="text"
	/>
</div>
