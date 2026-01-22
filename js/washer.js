import { requireAccessOrRedirect, getCurrentUser } from "./auth.js";

requireAccessOrRedirect("washer");

const openJobsEl = document.getElementById("lb-open-jobs");
const myJobsEl = document.getElementById("lb-my-jobs");

const { email } = getCurrentUser();

async function loadJobs() {
  const res = await fetch("/api/list-jobs?washer=" + email);
  const data = await res.json();

  openJobsEl.innerHTML = "";
  myJobsEl.innerHTML = "";

  data.open.forEach(job => {
    const div = document.createElement("div");
    div.className = "lb-list-item";
    div.innerHTML = `
      <p><strong>${job.description}</strong></p>
      <p>${job.address}</p>
      <button class="lb-primary-btn" data-id="${job.id}">Accept</button>
    `;
    div.querySelector("button").addEventListener("click", () => acceptJob(job.id));
    openJobsEl.appendChild(div);
  });

  data.mine.forEach(job => {
    const div = document.createElement("div");
    div.className = "lb-list-item";
    div.innerHTML = `
      <p><strong>${job.description}</strong></p>
      <p>Status: ${job.status}</p>
      <p>${job.address}</p>
    `;
    myJobsEl.appendChild(div);
  });
}

async function acceptJob(id) {
  await fetch("/api/update-job", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jobId: id,
      washerEmail: email,
      status: "accepted"
    })
  });

  loadJobs();
}

loadJobs();
