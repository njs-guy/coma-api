<script lang="ts">
let dataInput: string;
</script>

<textarea
	class="data-input-textarea textarea border-color flex-grow w-full h-full p-1 bg-deep mono focus:outline-none"
	placeholder="JSON data"
	bind:value={dataInput}
/>

<style scoped>
.data-input-textarea {
	resize: none;
}
</style>
