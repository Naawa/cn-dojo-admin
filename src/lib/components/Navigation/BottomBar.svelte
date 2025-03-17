<script>
	import { enhance } from '$app/forms';
	import { navItems } from './data';
	import { page } from '$app/state';
</script>

<nav class="bordered">
	<div>
		{#each navItems as navItem}
			<a class:active={page.url.pathname == navItem.url} href={navItem.url}
				><b>
					{navItem.text.charAt(0)}
				</b></a
			>
		{/each}
		<form method="post" action="/dashboard?/logout" use:enhance>
			<button class="danger-btn"> <b>L</b> </button>
		</form>
	</div>
</nav>

<style>
	nav {
		padding: 1em 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 10vh;

		div {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.5em;
			a {
				display: flex;
				justify-content: center;
				align-items: center;
				text-decoration: none;
				transition: all 0.2s;
				height: calc(10vh - 2em);
				width: calc((100vw - 4em)/7);
				border-radius: 0.4em;
				border: solid 0.16em rgba(255, 255, 255, 0.393);
				text-align: center;
				b {
					transition: all 0.2s;
				}
			}
			a:hover,
			.active {
				transition: all 0.2s;
				background-color: rgba(0, 123, 227, 1);
				b {
					transition: all 0.2s;
					color: white;
				}
			}
			form {
				height: calc(10vh - 2em);
				width: calc((100vw - 4em)/7);
				padding: 0;
				 position: relative;

				button {
					min-width: 100%;
					padding: 0;
					height: calc(10vh - 2em);
					width: 100%;
					position: absolute;
					b {
						color: white;
					}
				}
				button:hover {
					color: #ca0d0d;
				}
			}
		}

		b {
			font-size: 2vh;
		}
	}
</style>
