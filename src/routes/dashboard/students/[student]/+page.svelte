<script lang="ts">
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import type { Student, StudentProfile } from '$lib/server/db/schema/student.js';
    import { writable } from 'svelte/store';

    let { data, form } = $props();
    let { userName, students } = $state(data);
    let studentData: { student: Student, student_profile: StudentProfile } = $state(data.students[0]);

    let student = $state(data.students[0].student);
    let student_profile = $state(data.students[0].student_profile);
    let activeTab = writable<'positive' | 'negative'>('positive');
    let index = $state(0);
    for (let i = 0; i < data.students.length; i++) {
        if (data.students[i].student.userName == userName) {
            index = i;
            break;
        }
    }

  $effect(() => {
        
		students = data.students;
        studentData = data.students[index];
        student_profile = data.students[index].student_profile;
        student = data.students[index].student;
    });
</script>

<section>
  <!-- Student Profile Information -->
  <div class="header">
      <div>
          <h1>{student.firstName} {student.lastName}</h1>
          <h2>{student_profile.points} Points</h2>
          <h4>{student_profile.belt} Belt - Level {student_profile.level}</h4>
          <h3>{student.email}</h3>
      </div>

      <!-- Custom Input for Adding Points -->
      <form method="post" action="/dashboard/students/{userName}?/addPoints" use:enhance class="custom-controls">
          <input type="number" name="pointsToAdd" placeholder="Custom Points">
          <input hidden value={student_profile.points} type="text" name="points">
          <input hidden value={student.id} type="text" name="studentId">
          <button onclick={() => { invalidateAll()}}>Modify Points</button>
      </form>
  </div>

  <!-- Tabs for Positive & Negative Buttons -->
  <div class="tabs">
      <button onclick={() => activeTab.set('positive')} class="{ $activeTab === 'positive' ? 'active' : '' }">Positive</button>
      <button onclick={() => activeTab.set('negative')} class="{ $activeTab === 'negative' ? 'active' : '' }">Negative</button>
  </div>

  <!-- Positive Buttons -->
  {#if $activeTab === 'positive'}
  <div class="grid">
      <form method="post" action="/dashboard/students/{userName}?/addPoints" use:enhance={
        ({})=>{reset: true}
      }>
          <input hidden value="5" name="pointsToAdd">
          <input hidden value={student_profile.points} type="text" name="points">
          <input hidden value={student.id} type="text" name="studentId">
          <button class="point-btn positive" onclick={() => { invalidateAll() }}>
              <span class="point-value">+5</span>
              <img src="/attention.png" alt="Add Points" class="icon">
              <span class="label">Game Finished</span>
          </button>
      </form>

      <form method="post" action="/dashboard/students/{userName}?/addPoints" use:enhance>
          <input hidden value="10" name="pointsToAdd">
          <input hidden value={student_profile.points} type="text" name="points">
          <input hidden value={student.id} type="text" name="studentId">
          <button class="point-btn positive" onclick={() => { invalidateAll()}}>
              <span class="point-value">+10</span>
              <img src="/attention.png" alt="Add Points" class="icon">
              <span class="label">Level-Up</span>
          </button>
      </form>
  </div>
  {/if}

  <!-- Negative Buttons -->
  {#if $activeTab === 'negative'}
  <div class="grid">
      <form method="post" action="/dashboard/students/{userName}?/removePoints" use:enhance>
          <input hidden value="5" name="pointsToRemove">
          <input hidden value={student_profile.points} type="text" name="points">
          <input hidden value={student.id} type="text" name="studentId">
          <button class="point-btn negative" onclick={() => { invalidateAll()}}>
              <span class="point-value">-5</span>
              <img src="/close-login.png" alt="Remove Points" class="icon">
              <span class="label">Disrespectful</span>
          </button>
      </form>

      <form method="post" action="/dashboard/students/{userName}?/removePoints" use:enhance>
          <input hidden value="10" name="pointsToRemove">
          <input hidden value={student_profile.points} type="text" name="points">
          <input hidden value={student.id} type="text" name="studentId">
          <button class="point-btn negative" onclick={() => { invalidateAll()}}>
              <span class="point-value">-10</span>
              <img src="/close-login.png" alt="Remove Points" class="icon">
              <span class="label">No Bueno</span>
          </button>
      </form>
  </div>
  {/if}
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
      background-color: rgba(0,123,227,1);
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
      border: 3px solid #333;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
