<script>
	import { enhance } from '$app/forms';
	import { navItems } from './data';
	import { page } from '$app/state';
</script>

<nav>
	<img src="/svgs/NinjaHead.svg" alt="Logo." />
	<div>
		{#each navItems as navItem}
			<a class:active={page.url.pathname == navItem.url} href={navItem.url}>
				<img src={navItem.icon} alt="Icon" />
				<b>
					{navItem.text}
				</b>
				<div class="orb"></div>
				</a
			>
		{/each}
	</div>
	<form method="post" action="/dashboard?/logout" use:enhance>
		<button class="transparent" id="mobileSignOut">
			<img src="/svgs/logout.svg" alt="Icon" />
			<b>Logout</b>
			<div class="orb"></div>
			</button
		>
	</form>
</nav>

<style>
	nav {
		padding: 4em 1em 4em;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1em;
		height: 100%;
		width: 14em;

		img {
			height: 3em;
		}

		div {
			display: flex;
			justify-content: center;
			flex-direction: column;
			gap: 1.5em;
			a {
				display: flex;
				align-items: center;
				text-decoration: none;
				font-size: 1em;
				transition: all 0.2s;
				width: 100%;
				padding: 0em 1em;
				border-right: none;
				position: relative;


				gap: 1em;

				img {
					height: 2.2em;
					width: 2em;
				}
				b {
					transition: all 0.2s;
					color: #f1f6f8;
				}
			}
			a:hover,
			.active {
				transition: all 0.2s;
				.orb {
					background-color: #f1f6f8;
					transition: all 0.2s;
				}
				b {
					padding-left: 0.5em;
					transition: all 0.2s;
				}
			}
		}

		.orb {
			height: 1em;
			width: 0.2em;
			background-color: #f1f6f8;
			border-radius: 1em;
			background-color: transparent;
			transition: all 0.2s;
			position: absolute;
			right: 0;
		}
		form {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			button {
				display: flex;
				align-items: center;
				gap: 1em;
				min-width: 100%;
				padding: 0.5em 1em;
				transition: all 0.2s;
				font-size: 1em;

				b {
					color: #f1f6f8;
					transition: all 0.2s;
				}

				img {
					height: 2.2em;
					width: 2em;
				}
			}
			button:hover {
				transition: all 0.2s;
				b {
					padding-left: 0.5em;
					transition: all 0.2s;
				}
				.orb {
					background-color: #f1f6f8;
				}
			}
		}
	}
</style>
