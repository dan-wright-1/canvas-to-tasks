// Mock Canvas assignment data — stands in for a real Canvas API pull.
const ASSIGNMENTS = [
  { id: "a1", course: "CS 340", courseName: "Software Design", title: "Homework 4: Recursion", due: "Fri, Sep 18", points: 20 },
  { id: "a2", course: "CS 340", courseName: "Software Design", title: "Project Milestone 2", due: "Mon, Sep 21", points: 100 },
  { id: "a3", course: "STAT 121", courseName: "Principles of Statistics", title: "Lab 6: Confidence Intervals", due: "Wed, Sep 23", points: 15 },
  { id: "a4", course: "STAT 121", courseName: "Principles of Statistics", title: "Quiz 5", due: "Fri, Sep 25", points: 10 },
  { id: "a5", course: "WRTG 316", courseName: "Technical Writing", title: "Draft: Formal Report", due: "Tue, Sep 22", points: 50 },
  { id: "a6", course: "REL 225", courseName: "Foundations of the Restoration", title: "Reading Reflection 7", due: "Thu, Sep 24", points: 5 },
  { id: "a7", course: "REL 225", courseName: "Foundations of the Restoration", title: "Discussion Post 4", due: "Sun, Sep 20", points: 10 },
];

function renderAssignmentList() {
  const list = document.getElementById("assignment-list");
  if (!list) return;
  list.innerHTML = ASSIGNMENTS.map(a => `
    <li class="assignment-row">
      <input type="checkbox" checked data-id="${a.id}" />
      <div class="assignment-main">
        <div class="assignment-title">${a.title}</div>
        <div class="assignment-meta">${a.course} &middot; ${a.points} pts</div>
      </div>
      <div class="assignment-due">${a.due}</div>
    </li>
  `).join("");
  updateSyncCount();
  list.addEventListener("change", updateSyncCount);
}

function updateSyncCount() {
  const btn = document.getElementById("sync-btn");
  if (!btn) return;
  const checked = document.querySelectorAll("#assignment-list input[type=checkbox]:checked").length;
  btn.textContent = `Sync ${checked} to Google Tasks`;
  btn.disabled = checked === 0;
}

function goSync() {
  const checked = Array.from(document.querySelectorAll("#assignment-list input[type=checkbox]:checked"))
    .map(cb => cb.dataset.id);
  localStorage.setItem("syncedIds", JSON.stringify(checked));
  window.location.href = "synced.html";
}

function renderSyncedList() {
  const list = document.getElementById("task-list");
  if (!list) return;
  const syncedIds = JSON.parse(localStorage.getItem("syncedIds") || "[]");
  const synced = ASSIGNMENTS.filter(a => syncedIds.includes(a.id));
  document.getElementById("synced-count").textContent = synced.length;
  list.innerHTML = synced.map(a => `
    <li class="task-row">
      <span class="task-check">&#10003;</span>
      <span class="task-title">${a.title}</span>
      <span class="task-due">${a.due}</span>
    </li>
  `).join("");
}
