import drawTaskOne from "./tasks/draw-task-one";

const select = document.getElementById("views-select") as HTMLSelectElement;
const button = document.getElementById("launch-btn") as HTMLButtonElement;

type FunctionRecord = Record<string, () => void>;

const functions: FunctionRecord = { drawTaskOne };

button.addEventListener("click", () => {
  const fn = functions[select.value];

  if (fn) fn();
});
