
const STORAGE_KEY = "liftlogWorkouts";

const exerciseCatalog = [
  { name: "Squat", group: "Legs" },
  { name: "Romanian Deadlift", group: "Legs" },
  { name: "Bench Press", group: "Chest" },
  { name: "Incline Dumbbell Press", group: "Chest" },
  { name: "Lat Pulldown", group: "Back" },
  { name: "Barbell Row", group: "Back" },
  { name: "Shoulder Press", group: "Shoulders" },
  { name: "Lateral Raise", group: "Shoulders" },
  { name: "Bicep Curl", group: "Arms" },
  { name: "Tricep Pushdown", group: "Arms" }
];

const starterWorkouts = [
  {
    id: "w1",
    date: "2026-03-10",
    exercise: "Squat",
    sets: 4,
    reps: 8,
    notes: "Strong lower body session with good depth."
  },
  {
    id: "w2",
    date: "2026-03-12",
    exercise: "Bench Press",
    sets: 4,
    reps: 8,
    notes: "Steady chest workout and better bar control."
  },
  {
    id: "w3",
    date: "2026-03-14",
    exercise: "Lat Pulldown",
    sets: 3,
    reps: 10,
    notes: "Focused on full range of motion."
  }
];

function createId() {
  return `w${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

function saveWorkouts(workouts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

function loadWorkouts() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.error("Could not read saved workouts.", error);
    }
  }

  saveWorkouts(starterWorkouts);
  return starterWorkouts;
}

function formatDate(dateString) {
  if (!dateString) return "No date";

  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function calculateStats(workouts) {
  return workouts.reduce(
    (totals, workout) => {
      totals.totalWorkouts += 1;
      totals.totalSets += Number(workout.sets) || 0;
      totals.totalReps += Number(workout.reps) || 0;
      return totals;
    },
    { totalWorkouts: 0, totalSets: 0, totalReps: 0 }
  );
}

function getMotivationMessage(stats) {
  if (stats.totalWorkouts === 0) {
    return "Start your first workout today and build momentum one session at a time.";
  }

  if (stats.totalWorkouts < 4) {
    return "You are building a strong start. Keep logging workouts and your consistency will grow.";
  }

  if (stats.totalReps < 100) {
    return "Nice progress so far. A few more workouts will make your effort really add up.";
  }

  return "You are staying consistent and putting in real work. Keep going and trust the process.";
}

function populateExerciseOptions() {
  const list = document.querySelector("#exerciseOptions");
  if (!list) return;

  list.innerHTML = "";

  exerciseCatalog.forEach((exercise) => {
    const option = document.createElement("option");
    option.value = exercise.name;
    list.appendChild(option);
  });
}

function renderHomePage() {
  const workouts = [...loadWorkouts()].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const stats = calculateStats(workouts);

  const totalWorkouts = document.querySelector("#totalWorkouts");
  const totalSets = document.querySelector("#totalSets");
  const totalReps = document.querySelector("#totalReps");
  const motivationText = document.querySelector("#motivationText");

  if (totalWorkouts) totalWorkouts.textContent = stats.totalWorkouts;
  if (totalSets) totalSets.textContent = stats.totalSets;
  if (totalReps) totalReps.textContent = stats.totalReps;
  if (motivationText) motivationText.textContent = getMotivationMessage(stats);
}

function renderWorkoutPage() {
  populateExerciseOptions();

  const form = document.querySelector("#workoutForm");
  const savedWorkoutsContainer = document.querySelector("#savedWorkouts");
  const formMessage = document.querySelector("#formMessage");
  const submitButton = document.querySelector("#submitButton");
  const dateField = document.querySelector("#date");
  const exerciseField = document.querySelector("#exerciseInput");
  const setsField = document.querySelector("#sets");
  const repsField = document.querySelector("#reps");
  const notesField = document.querySelector("#notes");

  let workouts = loadWorkouts();
  let editId = "";

  function setMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
  }

  function resetForm() {
    form.reset();
    editId = "";
    submitButton.textContent = "Save Workout";
  }

  function renderSavedWorkouts() {
    workouts = loadWorkouts();

    if (workouts.length === 0) {
      savedWorkoutsContainer.innerHTML = `
        <div class="empty-state">
          No workouts saved yet. Add your first workout above.
        </div>
      `;
      return;
    }

    const sortedWorkouts = [...workouts].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    savedWorkoutsContainer.innerHTML = sortedWorkouts
      .map(
        (workout) => `
          <article class="entry-card">
            <div class="entry-head">Workout Entry</div>
            <div class="entry-body">
              <div class="entry-details">
                <p><strong>${escapeHtml(workout.exercise)}</strong></p>
                <div class="entry-meta">
                  <p><strong>Date:</strong> ${formatDate(workout.date)}</p>
                  <p><strong>Sets:</strong> ${workout.sets}</p>
                  <p><strong>Reps:</strong> ${workout.reps}</p>
                  <p><strong>Notes:</strong> ${escapeHtml(workout.notes)}</p>
                </div>
              </div>
              <div class="entry-actions">
                <button class="link-button" type="button" data-action="edit" data-id="${workout.id}">Edit</button>
                <button class="link-button" type="button" data-action="delete" data-id="${workout.id}">Delete</button>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const date = dateField.value;
    const exercise = exerciseField.value.trim();
    const sets = Number(setsField.value);
    const reps = Number(repsField.value);
    const notes = notesField.value.trim();

    if (!date || !exercise || !sets || !reps) {
      setMessage("Please complete date, exercise, sets, and reps before saving.", "error");
      return;
    }

    if (sets < 1 || reps < 1) {
      setMessage("Sets and reps must both be at least 1.", "error");
      return;
    }

    const matchingExercise = exerciseCatalog.find(
      (item) => item.name.toLowerCase() === exercise.toLowerCase()
    );

    const finalNotes =
      notes || (matchingExercise ? `${matchingExercise.group} day workout.` : "No notes added.");

    const workoutData = {
      id: editId || createId(),
      date,
      exercise,
      sets,
      reps,
      notes: finalNotes
    };

    if (editId) {
      workouts = workouts.map((workout) =>
        workout.id === editId ? workoutData : workout
      );
      setMessage("Workout updated.", "success");
    } else {
      workouts.push(workoutData);
      setMessage("Workout saved.", "success");
    }

    saveWorkouts(workouts);
    renderSavedWorkouts();
    resetForm();
  });

  savedWorkoutsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    const workoutId = button.dataset.id;

    if (action === "delete") {
      workouts = workouts.filter((workout) => workout.id !== workoutId);
      saveWorkouts(workouts);
      renderSavedWorkouts();

      if (editId === workoutId) {
        resetForm();
      }

      setMessage("Workout deleted.", "success");
    }

    if (action === "edit") {
      const workoutToEdit = workouts.find((workout) => workout.id === workoutId);
      if (!workoutToEdit) return;

      dateField.value = workoutToEdit.date;
      exerciseField.value = workoutToEdit.exercise;
      setsField.value = workoutToEdit.sets;
      repsField.value = workoutToEdit.reps;
      notesField.value = workoutToEdit.notes;
      editId = workoutToEdit.id;
      submitButton.textContent = "Update Workout";
      setMessage("Editing workout entry.", "success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  renderSavedWorkouts();
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "home") {
    renderHomePage();
  }

  if (page === "workout") {
    renderWorkoutPage();
  }
});