<script lang="ts">
export let label: string;
export let description = "";
</script>

<div class="flex flex-col">
	<p>{label}</p>
	<p class="desc-text">{description}</p>
	<input
		class="input input-bordered input-sm w-full bg-deep"
		type="text"
	/>
</div>
