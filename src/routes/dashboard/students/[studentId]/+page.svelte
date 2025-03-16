<script lang="ts">
	import { enhance } from '$app/forms';
	import Delete from '$lib/components/Actions/Delete.svelte';
	import type { Student, StudentProfile } from '$lib/server/db/schema/student.js';

    let { data, form } = $props()

    let { studentId, students } = data
    let studentData: { student: Student, student_profile: StudentProfile } = students[0];

    for(let i = 0; i < students.length; i++) {
      if(students[i].student.id == studentId) {
        studentData = students[i]
        break
      }
    }

    let { student, student_profile } = studentData
</script>

<section>
    <h1>{student.firstName} {student.lastName}</h1>
    <h3>{student_profile.points} Points</h3>
    <h4>{student_profile.belt} Belt - Level {student_profile.level}</h4>
    <h4>Ninja ID: {student.wristbandId}</h4>
    <h3>{student.email}</h3>

    <form method="post" action="/dashboard/students/{studentId}?/addPoints" use:enhance>
      <input type="text" name="pointsToAdd">
      <input hidden bind:value={student_profile.points} style="display: none;" type="text" name="points">
      <input hidden bind:value={student.id} style="display: none;"  type="text" name="studentId">
      {#if form?.error}
        <b>{form.error}</b>
      {/if}
      <button>Submit</button>
    </form>

    <form method="post" action="/dashboard/students/{studentId}?/addPoints" use:enhance>
      <input hidden style="display: none" value="5" name="pointsToAdd">
      <input hidden bind:value={student_profile.points} style="display: none;" type="text" name="points">
      <input hidden bind:value={student.id} style="display: none;"  type="text" name="studentId">
      {#if form?.error}
        <b>{form.error}</b>
      {/if}
      <button>+5</button>
    </form>
    <form method="post" action="/dashboard/students/{studentId}?/removePoints" use:enhance>
      <input hidden style="display: none" value="5" name="pointsToRemove">
      <input hidden bind:value={student_profile.points} style="display: none;" type="text" name="points">
      <input hidden bind:value={student.id} style="display: none;"  type="text" name="studentId">
      {#if form?.error}
        <b>{form.error}</b>
      {/if}
      <button>-5</button>
    </form>
    <Delete action="delete" object="student"></Delete>
</section>


<style>
  section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    gap: 0;
  }
</style>