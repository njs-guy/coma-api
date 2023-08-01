<script lang="ts">
export let label: string;
export let description = "";
export let checked: boolean;
</script>

<div class="form-control w-full">
	<label class="cursor-pointer label">
		<div class="flex flex-col">
			<span>{label}</span>
			<span class="desc-text">{description}</span>
		</div>
		<input
			type="checkbox"
			class="toggle toggle-primary self-center"
			{checked}
		/>
	</label>
</div>
