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

const COURSE_COLORS = {
  "CS 340": "#4f46e5",
  "STAT 121": "#0891b2",
  "WRTG 316": "#c2410c",
  "REL 225": "#15803d",
};

function groupByCourse() {
  const groups = {};
  ASSIGNMENTS.forEach(a => {
    if (!groups[a.course]) groups[a.course] = { courseName: a.courseName, items: [] };
    groups[a.course].items.push(a);
  });
  return groups;
}

function renderAssignmentGroups() {
  const container = document.getElementById("assignment-groups");
  if (!container) return;
  const groups = groupByCourse();

  container.innerHTML = Object.entries(groups).map(([course, group]) => `
    <section class="course-group" style="--course-color: ${COURSE_COLORS[course] || "#64748b"}">
      <div class="course-group-header">
        <h2>${course} <span class="course-group-name">${group.courseName}</span></h2>
        <label class="select-all">
          <input type="checkbox" checked data-select-all="${course}" /> Select all
        </label>
      </div>
      <ul class="assignment-list">
        ${group.items.map(a => `
          <li class="assignment-row">
            <input type="checkbox" checked data-id="${a.id}" data-course="${course}" />
            <div class="assignment-main">
              <div class="assignment-title">${a.title}</div>
              <div class="assignment-meta">${a.points} pts</div>
            </div>
            <div class="assignment-due">${a.due}</div>
          </li>
        `).join("")}
      </ul>
    </section>
  `).join("");

  updateSyncCount();
  container.addEventListener("change", (e) => {
    if (e.target.dataset.selectAll) {
      const course = e.target.dataset.selectAll;
      container.querySelectorAll(`input[data-course="${course}"]`).forEach(cb => cb.checked = e.target.checked);
    }
    updateSyncCount();
  });
}

function updateSyncCount() {
  const btn = document.getElementById("sync-btn");
  if (!btn) return;
  const checked = document.querySelectorAll("#assignment-groups input[data-id]:checked").length;
  btn.textContent = `Sync ${checked} to Google Tasks`;
  btn.disabled = checked === 0;
}

function goSync() {
  const checked = Array.from(document.querySelectorAll("#assignment-groups input[data-id]:checked"))
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
