document.addEventListener("DOMContentLoaded", function () {
  let closeFlashButton = document.querySelector("span.close-flash");
  if (closeFlashButton) {
    closeFlashButton.addEventListener("click", closeFlashMassage);
  }
  const completeStepCheckboxes = document.querySelectorAll(
    "input.complete-step"
  );
  if (completeStepCheckboxes) {
    completeStepCheckboxes.forEach((x) =>
      x.addEventListener("change", completeStep)
    );
  }
  calculateAllProgress();
});

function closeFlashMassage(ev) {
  const flashMessage = ev.target.parentElement;
  flashMessage.remove();
}

async function completeStep(ev) {
  const checkbox = ev.target;
  const pathId = checkbox.dataset.pathId;
  const stepId = checkbox.dataset.stepId;
  const done = checkbox.dataset.done === "true";
  console.log({ pathId, stepId });
  const response = await fetch("/api/profile/complete-step", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pathId, stepId, done: !done }),
  });
  if (response.ok) {
    checkbox.dataset.done = done ? "flase" : "true";
    calculateAllProgress();
  }
}
function calculateAllProgress() {
  const paths = document.querySelectorAll(".path");
  if (paths) {
    paths.forEach((x) => calculateProgress(x));
  }
}

const calculateProgress = (el) => {
  const steps = el.querySelectorAll("input.complete-step");
  const totalSteps = steps.length;
  const completedSteps = el.querySelectorAll(
    `input.complete-step[data-done="true"]`
  ).length;
  const progress = el.querySelector(".progress-bar");
  progress.style.width = `${(completedSteps / totalSteps) * 100}%`;

  const stepsCount = el.querySelector(".steps-count");
  stepsCount.innerText = `${completedSteps}/${totalSteps}`;

  const progressPercent = el.querySelector(".progress-percent");
  progressPercent.innerText = `${Math.round(
    (completedSteps / totalSteps) * 100
  )}%`;

};
