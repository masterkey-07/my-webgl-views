import { DumbDrawer } from "./pages/dumb-drawer/dumb-drawer";
import { FlowerClownCar } from "./pages/flower-clown-car/flower-clown-car";
import { RouteObject } from "react-router-dom";

export default [
  { path: "/flower-clown-car", element: <FlowerClownCar /> },
  { path: "/dumb-drawer", element: <DumbDrawer /> },
] as RouteObject[];
