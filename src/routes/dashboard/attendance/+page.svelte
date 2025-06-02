<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import type { Student, StudentProfile } from '$lib/server/db/schema/student.js';

	/**
	 * Finish students page first.  
	 */
	let { form, data } = $props();
    
	let { attendees, students, admin } = $state(data);

	let searchTerm: string = $state(''.toLocaleLowerCase().replace(/\s/g, ''));
	let filtered: { student: Student; student_profile: StudentProfile }[] = $state([]);

	let openScanner = false;

    $effect(() => {
        if(form?.success) {
            invalidate(page.url)
        }
    })

	$effect(() => {
		students = data.students;
		attendees = data.attendees;
	});

	$effect(() => {
		if (searchTerm.length > 0) {
			/**
			 * // Searching
			 * 1. Check if keys include search term.
			 * 2. Then check if students have already been searched.
			 * 3. Then check push to array, else skip.\
			 */
			for (let i = 0; i < students.length; i++) {
				let { student } = students[i];
				let { student_profile } = students[i];
				let studentKeys = (student.firstName + student.lastName).toLocaleLowerCase();

				if (studentKeys.includes(searchTerm)) {
					// 1. Check if already searched.
					let searched = false;
					for (let j = 0; j < filtered.length; j++) {
						let filteredStudentKeys = (
							filtered[j].student.firstName + filtered[j].student.lastName
						).toLocaleLowerCase();

						if (filteredStudentKeys == studentKeys) {
							searched = true;
							break;
						}
					}
					if (!searched) {
						filtered.push({ student, student_profile });
					}
				}
				/**
				 // Sorting
				* 1. Check which key includes more characters.
				* 2. Check which key contains the search term first.
				* 3. Check if key starts with search term.
				* 
				*/
				filtered.sort((x, y) => {
					let xKeys = (x.student.firstName + x.student.lastName).toLocaleLowerCase();
					let yKeys = (y.student.firstName + y.student.lastName).toLocaleLowerCase();

					let xKeyChars = 0;
					let yKeyChars = 0;

					for (let k = 0; k < searchTerm.length; k++) {
						if (xKeys.includes(searchTerm.charAt(k))) {
							xKeyChars++;
						}
						if (yKeys.includes(searchTerm.charAt(k))) {
							yKeyChars++;
						}
					}
					if (
						xKeys.indexOf(searchTerm) < yKeys.indexOf(searchTerm) ||
						xKeyChars > yKeyChars ||
						xKeys.indexOf(searchTerm) == 0
					) {
						return -1;
					}
					if (xKeys.indexOf(searchTerm) == yKeys.indexOf(searchTerm) && xKeyChars == yKeyChars) {
						return 0;
					}
					return 1;
				});
			}
		} else {
			filtered = [];
		}
	});

    function isAttending(studentId: string) {
        for(let i = 0; i < attendees.length; i++) {
            if(attendees[i].student.id == studentId ) {
                return true
            }
        }
        
        return false
    }
</script>

<section>
	<h2>Attendance</h2>
	<span>
		<input bind:value={searchTerm} type="search" placeholder="Search" />
		<button
			onclick={() => {
				openScanner = true;
			}}>Scan Wristband</button
		>
		<a href="/display" target="_blank"><button>Display</button></a>
	</span>
	<span>
		{#key filtered.length}
			{#if filtered.length >= 1}
				{#each filtered as data}
					<div class="card">
						<div>
							<h3>
								{data.student.firstName}
								{data.student.lastName}
							</h3>
							<h4>{data.student_profile.points} Pts</h4>
						</div>
                        {#if isAttending(data.student.id)}
                            <h3><i>Attending</i></h3>
                        {:else}
                            <form method="post" action="/dashboard/attendance?/addAttendee" use:enhance>    
                                <input hidden type="text" name="studentId" value={data.student.id}>
                                <input hidden type="text" name="location" value={admin?.center}>
                                <button>Add to Class</button>
                            </form>
                        {/if}
                        </div>
				{/each}
			{:else if filtered.length == 0}
				{#each attendees as data}
					<div class="card">
						<div>
							<h3>
								{data.student.firstName}
								{data.student.lastName}
							</h3>
							<h4>{data.profile.points} Pts</h4>
						</div>
                        {#if isAttending(data.student.id)}
                             <form method="post" action="/dashboard/attendance?/removeAttendee" use:enhance>    
                                <input hidden type="text" name="studentId" value={data.student.id}>
                                <input hidden type="text" name="location" value={admin?.center}>
                                <button class="danger-btn" type="submit">Remove from Class</button>
                            </form>
                        {/if}
					</div>
				{/each}
			{/if}
		{/key}
	</span>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;

		span {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1em;
			flex-wrap: wrap;
		}
		span:last-of-type {
			overflow: scroll;
			padding: 1em;
			height: 100%;
		}

		a {
			text-decoration: none;
		}
	}
</style>
