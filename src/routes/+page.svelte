<script lang="ts">
	import { enhance } from '$app/forms';
	import { centers } from '$lib/data';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let center: string = $state('');

	/**
	 * 
	<span class="left-section">
		<!-- Left Section -->
		<h4 style="color: white; font-size: 2em;">Welcome to the Dojo</h4>

		<!-- Background Image -->
		<img class="background-img" src="/homepage-Front Page Background 3.png" alt="" />

		<!-- Hidden List that appears on hover -->
		<ul class="hidden-list">
			<li>1. Here you can keep track of the ninjas progress</li>
			<li>2. Earn points as you complete games and level up</li>
			<li>3. Spend points in the shop for accesories and goodies</li>
			<li>4. Check the typing leaderboard</li>
			<li>5. Customize your ninja avatar</li>
		</ul>
	</span>
	*/
</script>

<section>


	<div class="shadowed">
		<!-- Login Form -->
		<h2>Admin Login</h2>
		<br />
		<br />
		<form method="post" action="?/login" use:enhance autocomplete="off">
			<div class="input-container">
				<label for="email"> Email </label>
				<input name="email" type="email" placeholder="m@example.com"/>
			</div>

			<div class="input-container">
				<label for="password"> Password </label>
				<input type="password" name="password"/>
			</div>
			<!--
			<label>
				Firstname
				<input name="firstName" type="name" placeholder="Naous" autocomplete="new-password" />
			</label>
			<label>
				Lastname
				<input name="lastName" type="name" placeholder="Islam" autocomplete="new-password" />
			</label>
			
			<label for="center">Center</label>
				<select bind:value={center} name="center">
					{#each centers as center}
						<option value={center}>{center}</option>
					{/each}
				</select>
				-->
			<button class="primary">Login</button>
		</form>
		<br />
		<p style="color: red">{form?.message ?? ''}</p>
	</div>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100svh;
		padding: 0;
		background: #0067be;
		background: linear-gradient(
			180deg,
			rgb(114, 164, 255) 0%,
			rgb(224, 185, 255) 50%,
			rgb(255, 190, 191) 100%
		);
	}

	div {
		background: white;
		background: linear-gradient(
			180deg,
			rgb(244, 245, 255) 0%,
			rgb(249, 241, 255) 50%,
			rgb(255, 239, 239) 100%
		);
		padding: 4em;
		border-radius: 1em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: fit-content;
		width: fit-content;
		gap: 1em;
	}
	.input-container {
		padding: 0;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: fit-content;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	button {
		margin-top: 0.5em;
	}
</style>
