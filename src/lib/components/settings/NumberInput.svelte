<script lang="ts">
export let label: string;
export let description = "";
export let min = 0;
export let max = 100;
export let defaultValue: number;
</script>

<div class="flex flex-row">
	<div class="flex flex-col mr-2">
		<p>{label}</p>
		<p class="desc-text">{description}</p>
	</div>
	<input
		class="input input-bordered input-sm w-auto bg-deep self-center"
		type="number"
		{min}
		{max}
		value={defaultValue}
	/>
</div>
