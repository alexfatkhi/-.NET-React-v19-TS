import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div>
          <Header />
          <Outlet />
          {/* ini adalah komonen untun merender komponen anak  */}
          <PizzaOfTheDay />
        </div>
        <TanStackRouterDevtools />
      </>
    );
  },
});