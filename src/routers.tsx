import { DumbDrawer } from "./pages/dumb-drawer/dumb-drawer";
import { DumbPong } from "./pages/dumb-pong/dumb-pong";
import { FlowerClownCar } from "./pages/flower-clown-car/flower-clown-car";
import { RouteObject } from "react-router-dom";
import { LifeFlowerClownCar } from "./pages/life-flower-clown-car/life-flower-clown-car";
import { FourSquares } from "./pages/four-squares/four-squares";

export default [
  { path: "/flower-clown-car", element: <FlowerClownCar /> },
  { path: "/dumb-drawer", element: <DumbDrawer /> },
  { path: "/dumb-pong", element: <DumbPong /> },
  { path: "/animated-flower-clown-car", element: <LifeFlowerClownCar /> },
  { path: "/four-squares", element: <FourSquares /> },
] as RouteObject[];
