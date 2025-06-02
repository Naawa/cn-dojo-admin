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

		overflow: scroll;

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
		z-index: 1;
	}
	.background {
		background: #0067be;
		background: linear-gradient(
			180deg,
			rgb(80, 103, 255) 0%,
			rgb(207, 147, 255) 50%,
			rgb(255, 156, 157) 100%
		);
	}
	.main {
		background: white;
		background: linear-gradient(
			180deg,
			rgb(244, 245, 255) 0%,
			rgb(249, 241, 255) 50%,
			rgb(255, 239, 239) 100%
		);
		padding: 1em;
	}

	@media (width < 800px) {
		.side-nav {
			display: none;
		}
		.bottom-nav {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		div {
			flex-direction: column;
			div {
				max-height: calc(100svh - 15vw);
				margin-left: 0;
			}
		}
	}
</style>
