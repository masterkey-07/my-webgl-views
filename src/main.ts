import drawTaskOne from "./tasks/draw-task-one";
import drawTaskTwo from "./tasks/draw-task-two";

const select = document.getElementById("views-select") as HTMLSelectElement;
const button = document.getElementById("launch-btn") as HTMLButtonElement;

type FunctionRecord = Record<string, () => void>;

const functions: FunctionRecord = { drawTaskOne, drawTaskTwo };

button.addEventListener("click", () => {
  const fn = functions[select.value];

  if (fn) {
    window.history.pushState({}, "", select.value);
    fn();
  }
});

const path = window.location.pathname.split("/").pop();

if (path && functions[path]) {
  functions[path]();
}
