<script>
	import BottomBar from '$lib/components/Navigation/BottomBar.svelte';
	import SideBar from '$lib/components/Navigation/SideBar.svelte';
</script>

<div class="background">
	<span class="side-nav"><SideBar></SideBar></span>
	<div class="main">
		<slot />
	</div>
	<span class="bottom-nav"><BottomBar></BottomBar></span>
</div>

<style>
	div {
		display: flex;
		position: relative;
		height: 100svh;
		gap: 1em;
		padding: 1em;

		div {
			flex-direction: column;
			position: relative;
			width: 100%;
			height: 100%;
			padding: 0;
		}
	}
	.side-nav {
		display: flex;
	}
	.bottom-nav {
		display: none;
		bottom: 0;
		width: 100;
		background-color: #fcfdff;
		z-index: 1;
	}
	.background {
		background: #0067be;
		background: linear-gradient(
			180deg,
			rgb(81, 177, 255) 0%,
			rgb(182, 93, 255) 50%,
			rgb(247, 90, 255) 100%
		);
	}
	.main {
		background-color: #f1f6f8;
		border-radius: 0.5em;
	}

	@media (width < 1600px) {
		.side-nav {
			display: none;
		}
		.bottom-nav {
			display: flex;
		}
		div {
			flex-direction: column;
			div {
				max-height: calc(90svh - 3em);
				margin-left: 0;
			}
		}
	}
</style>
