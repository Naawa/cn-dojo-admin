<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Delete from '$lib/components/Actions/Delete.svelte';
	import type { Student, StudentProfile } from '$lib/server/db/schema/student.js';

	let { data, form } = $props();
	let { studentId, students } = $derived(data);

	let studentData: { student: Student; student_profile: StudentProfile } | undefined = $derived.by(() => {
		for (let i = 0; i < data.students.length; i++) {
			if (data.students[i].student.id == studentId) {
				return {
                    student: students[i].student,
                    student_profile: students[i].student_profile
                };
			}
		}
	});

	let { student, student_profile } = $derived(studentData as { student: Student; student_profile: StudentProfile });
</script>

<section>
	<!-- Student Profile Information -->
	<div class="header card">
		<div>
			<h1>{student.firstName} {student.lastName}</h1>
			<h2>{student_profile.points} Points</h2>
			<h4>{student_profile.belt} Belt - Level {student_profile.level}</h4>
			<h4>Ninja ID: {student.wristbandId}</h4>
			<h3>{student.email}</h3>
		</div>
	</div>
	<Delete action="delete" object="student"></Delete>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		width: 100%;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		max-width: 800px;
		gap: 1rem;
	}

	.custom-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	/* Tabs Styling */
	.tabs {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.tabs button {
		padding: 10px 20px;
		border: none;
		background-color: #adadad;
		cursor: pointer;
		font-size: 1rem;
		border-radius: 5px;
		transition: background 0.3s;
	}

	.tabs button.active {
		background-color: rgba(0, 123, 227, 1);
		color: white;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 50px;
		width: fit-content;
		max-width: 600px;
		justify-content: center;
	}

	.point-btn {
		position: relative;
		width: 150px;
		min-width: 150px;
		height: 150px;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 10px;
		text-align: center;
	}

	/* Position the number at the top-right */
	.point-value {
		position: absolute;
		top: 5px;
		right: 10px;
		font-size: 0.8rem;
		font-weight: bold;
		background: rgba(255, 255, 255, 0.8);
		padding: 2px 5px;
		border-radius: 4px;
	}

	/* Push the icon down */
	.icon {
		width: 40px;
		height: 40px;
		object-fit: contain;
		margin-top: auto; /* Pushes it down */
	}

	/* Push the label to the bottom */
	.label {
		font-size: 0.8rem;
		text-align: center;
		margin-top: auto;
	}

	.positive {
		background-color: white;
	}

	.negative {
		background-color: white;
	}
</style>
