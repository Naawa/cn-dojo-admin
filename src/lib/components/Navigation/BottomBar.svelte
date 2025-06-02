<script>
	import { enhance } from '$app/forms';
	import { navItems } from './data';
	import { page } from '$app/state';
</script>

<nav>
	<div>
		{#each navItems as navItem}
			<a class:active={page.url.pathname == navItem.url} href={navItem.url}>
				<img src={navItem.icon} alt="Icon" />
				<div class="orb"></div>
			</a>
		{/each}
		<form method="post" action="/dashboard?/logout" use:enhance>
			<button class="transparent" id="mobileSignOut">
				<img src="/svgs/logout.svg" alt="Icon" />
				<div class="orb"></div>
			</button>
		</form>
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: fit-content;

		div {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			gap: 1em;
			a {
				border: none;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-decoration: none;
				transition: all 0.2s;
				width: fit-content;
				border-radius: 0.4em;
				text-align: center;
				gap: 0;

				img {
					height: 8vw;
				}
			}
			a:hover,
			.active {
				transition: all 0.2s;
				.orb {
					background-color: #f1f6f8;
					transition: all 0.2s;
				}
			}
		}

		form {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			button {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				min-width: 100%;
				transition: all 0.2s;
				padding: 0;
				margin: 0;
				min-height: fit-content;
				min-width: fit-content;
				height: fit-content;
				width: fit-content;

				img {
					height: 8vw;
				}
			}

			button:hover {
				transition: all 0.2s;
				.orb {
					background-color: #f1f6f8;
					transition: all 0.2s;
				}
			}
		}

		.orb {
			height: 0.75vw;
			width: 4vw;
			background-color: #f1f6f8;
			border-radius: 1em;
			background-color: transparent;
			transition: all 0.2s;
			right: 0;
		}
	}
</style>
