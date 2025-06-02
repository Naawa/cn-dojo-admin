<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	/**
	 * Overview
	 * 1.
	 */
</script>

<section>
	<h1>Overview</h1>
	<span>
		<div class="normal-card shadowed">
			<h3>Hi, {data.admin.firstName}!</h3>
			<p>
				Welcome to your dashboard, on this overview page you'll get a summary of your students,
				attendance, shop and more! Use the links in the navigation bar to access the other pages.
			</p>
			<br />
		</div>
		<div class="normal-card shadowed">
			<h3>Students</h3>
			<p>Your center has <b>{data.students.length}</b> students!</p>
		</div>
		<div class="normal-card shadowed">
			<h3>Attendees</h3>
			<p>There are currently <b>{data.attendees.length}</b> attending students!</p>
		</div>
	</span>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1em;

		span {
			gap: 1em;
			display: flex;
			flex-wrap: wrap;
		}

		h1 {
			width: 100%;
			text-align: center;
		}
	}
</style>
