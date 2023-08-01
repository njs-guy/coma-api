<script lang="ts">
export let label: string;
export let description = "";
export let checked: boolean;
</script>

<div class="w-full cursor-pointer flex flex-row justify-between p-0">
	<div class="form-control">
		<span>{label}</span>
		<span class="desc-text">{description}</span>
	</div>
	<input
		type="checkbox"
		class="toggle toggle-primary self-center"
		{checked}
	/>
</div>
