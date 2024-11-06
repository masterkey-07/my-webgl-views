import { DumbDrawer } from "./pages/dumb-drawer/dumb-drawer";
import { DumbPong } from "./pages/dumb-pong/dumb-pong";
import { FlowerClownCar } from "./pages/flower-clown-car/flower-clown-car";
import { RouteObject } from "react-router-dom";

export default [
  { path: "/flower-clown-car", element: <FlowerClownCar /> },
  { path: "/dumb-drawer", element: <DumbDrawer /> },
  { path: "/dumb-pong", element: <DumbPong /> },
] as RouteObject[];
