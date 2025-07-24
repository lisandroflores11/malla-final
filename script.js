// script.js

function checkPrereqs(prereqStr) {
  if (!prereqStr) return true;
  const prereqs = prereqStr.split(',').map(p => p.trim());
  const completed = getSavedProgress();
  return prereqs.every(pr => completed.includes(pr));
}

function getSavedProgress() {
  return JSON.parse(localStorage.getItem("materiasCursadas") || "[]");
}

function saveProgress(progress) {
  localStorage.setItem("materiasCursadas", JSON.stringify(progress));
}

function updateStatus(subject) {
  const prereq = subject.dataset.prereq;
  const allCompleted = !prereq || checkPrereqs(prereq);
  const isCompleted = subject.classList.contains("completed");

  subject.classList.remove("available", "locked");

  if (isCompleted) {
    subject.classList.add("completed");
  } else if (allCompleted) {
    subject.classList.add("available");
  } else {
    subject.classList.add("locked");
  }
}

function toggle(el) {
  const prereq = el.dataset.prereq;
  if (!prereq || checkPrereqs(prereq)) {
    el.classList.toggle("completed");

    const completedSubjects = Array.from(document.querySelectorAll("li.completed"))
      .map(el => el.textContent.trim());
    saveProgress(completedSubjects);

    document.querySelectorAll("li").forEach(updateStatus);
  } else {
    alert("Prerrequisito: " + prereq);
  }
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const saved = getSavedProgress();
  const subjects = document.querySelectorAll("li");

  subjects.forEach(subject => {
    if (saved.includes(subject.textContent.trim())) {
      subject.classList.add("completed");
    }
    subject.addEventListener("click", () => toggle(subject));
    updateStatus(subject);
  });
});
