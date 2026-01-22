import { requireAccessOrRedirect, getCurrentUser } from "./auth.js";

requireAccessOrRedirect("client");

const descEl = document.getElementById("lb-job-desc");
const addrEl = document.getElementById("lb-job-address");
const createBtn = document.getElementById("lb-create-job");
const errorEl = document.getElementById("lb-job-error");
const jobList = document.getElementById("lb-job-list");

const { email } = getCurrentUser();

async function createJob() {
  const desc = descEl.value.trim();
  const address = addrEl.value.trim();

  if (!desc || !address) {
    errorEl.textContent = "Enter description and address.";
    return;
  }

  const res = await fetch("/api/create-job", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientEmail: email,
      description: desc,
      address
    })
  });

  const data = await res.json();
  if (!data.success) {
    errorEl.textContent = "Error creating job.";
    return;
  }

  descEl.value = "";
  addrEl.value = "";
  loadJobs();
}

async function loadJobs() {
  const res = await fetch("/api/list-jobs?client=" + email);
  const data = await res.json();

  jobList.innerHTML = "";

  data.jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "lb-list-item";
    div.innerHTML = `
      <p><strong>${job.description}</strong></p>
      <p>Status: ${job.status}</p>
      <p>Address: ${job.address}</p>
    `;
    jobList.appendChild(div);
  });
}

createBtn.addEventListener("click", createJob);
loadJobs();
