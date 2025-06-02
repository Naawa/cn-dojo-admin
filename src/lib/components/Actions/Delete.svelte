<script lang="ts">
	import { page } from "$app/state";
	import { scale } from "svelte/transition";

	let { action, object } = $props();
	let showConfirmRequest = $state(false);
</script>

<button class="danger-btn" onclick={() => (showConfirmRequest = true)}>Delete</button>

{#if showConfirmRequest}
	<form transition:scale method="post" action="{page.url.pathname}?/{action}">
		<b>Are you sure you want to delete this {object}?</b>
		<span>
			<button class="danger-btn" type="submit"
				>Confirm</button
			>
			<button type="reset" onclick={() => (showConfirmRequest = false)}>No</button>
		</span>
	</form>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
        align-items: center;
        justify-content: center;
		position: absolute;
		height: 100%;
		width: 100%;
        gap: 1em;
		top: 0;
		background: white;
		background: linear-gradient(
			180deg,
			rgb(244, 245, 255) 0%,
			rgb(249, 241, 255) 50%,
			rgb(255, 239, 239) 100%
		);

        span {
            display: flex;
            gap: 1em;
        }
	}
</style>
