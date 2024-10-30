import { FlowerClownCar } from "./pages/flower-clown-car";
import { Example1 } from "./pages/example1";
import { Example2 } from "./pages/example2";
import { Example3 } from "./pages/example3";
import { Example5 } from "./pages/example5";
import { RouteObject } from "react-router-dom";

export default [
  { path: "/example1", element: <Example1 /> },
  { path: "/example2", element: <Example2 /> },
  { path: "/example3", element: <Example3 /> },
  { path: "/example5", element: <Example5 /> },
  { path: "/flower-clown-car", element: <FlowerClownCar /> },
] as RouteObject[];
