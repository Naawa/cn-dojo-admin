<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { Student, StudentProfile } from '$lib/server/db/schema/student';
	import { scale } from 'svelte/transition';

	let {
		showModal = $bindable(),
		students
	}: {
		showModal: boolean;
		students: { student: Student; student_profile: StudentProfile }[];
	} = $props();

	let reward: string | null = $state(null);
	let next = $state(false);
	let wristbandId: string | null = $state(null);
	let username: string | null = $state(null);
	let selectedStudent: { student: Student; student_profile: StudentProfile } | null = $state(null);
    
	let filtered: { student: Student; student_profile: StudentProfile }[] = $derived.by(() => {
		let arr = [];
		if (wristbandId || username) {
			for (let i = 0; i < students.length; i++) {
				if (
					students[i].student.wristbandId.includes(wristbandId as string) ||
					students[i].student.userName.includes(username as string)
				) {
					arr.push(students[i]);
				}
			}
		}
		return arr;
	});

	$effect(() => {
		if (filtered.length == 0) {
			selectedStudent = null;
		}
	});
</script>

<form method="post" action="{page.url.pathname}?/{reward}" class="bordered" transition:scale use:enhance>
	<span>
		<h3>Reward Points</h3>
		<button
            type="reset"
			class="danger-btn"
			onclick={() => {
				showModal = false;
			}}>Exit</button
		>
	</span>
	<div>
		{#if !next}
			<h4>Select Reward</h4>
			<button
                type="button"
				onclick={() => {
					reward = 'typing';
				}}
				class="modal"
				class:selected={reward == 'typing'}>Typing +1</button
			>
			<button
                type="button"
				onclick={() => {
					reward = 'debug';
				}}
				class="modal"
				class:selected={reward == 'debug'}>Debug +5</button
			>
			<button
				type="reset"
				onclick={(e) => {
					e.preventDefault();
					next = true;
				}}>Next</button
			>
		{:else if next}
			<input type="text" placeholder="Scan Wristband" bind:value={wristbandId} />
			<input
				type="search"
				placeholder="Search by username..."
				bind:value={username}
			/>
			<input hidden name="selectedStudentId" value={selectedStudent?.student.id} />
			{#if filtered}
				{#each filtered as data}
					<button
                        type="button"
						onclick={() => {
							selectedStudent = data;
						}}
						class="modal"
						class:selected={data.student.userName == selectedStudent?.student.userName}
					>
						<h4>{data.student.userName}</h4>
					</button>
				{/each}
			{/if}
			<span>
				<button
                type="reset"
					class="danger-btn"
					onclick={() => {
						next = false;
					}}>Previous</button
				>
				<button type="submit">Submit</button>
			</span>
		{/if}
	</div>
</form>

<style>
	form {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: #fcfdff;
		padding: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4em;

		span {
			display: flex;
			width: 100%;
			justify-content: space-between;
			gap: 2em;
		}

		div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			gap: 1em;
		}

		.selected {
			border: solid 0.16em rgba(151, 170, 194, 0.326);
			scale: 1.02;
			color: hsl(203, 31%, 23%);
		}
	}
</style>
