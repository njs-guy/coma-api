<script lang="ts">
import { getVersion, getTauriVersion } from "@tauri-apps/api/app";
import { onMount } from "svelte";

let appVersion: string;
let tauriVersion: string;

onMount(async () => {
	appVersion = await getVersion();
	tauriVersion = await getTauriVersion();
});
</script>

<div class="about-page">
	<h2>Coma API</h2>
	<p>A simple RESTful API viewer</p>
	<p>v{appVersion}</p>
	<p>
		Check out the source code on <a
			target="_blank"
			href="https://github.com/njshockey/coma-api">Github</a
		>!
	</p>
</div>

<style scoped>
a {
	text-decoration: underline;
}
</style>
