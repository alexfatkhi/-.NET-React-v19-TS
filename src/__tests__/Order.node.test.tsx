import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { Provider } from "react-redux";
import { makeStore } from "../store";
import { Route } from "../routes/order.lazy";

// fetch dipalsukan (mock) supaya tidak menembak server beneran.
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// Test Order: tampil loading dulu, lalu data pizza dari API muncul.
test(
  "Order mengambil daftar pizza dari API lalu menampilkannya",
  async () => {
    const pizzas = [
      {
        id: "pepperoni",
        name: "The Pepperoni Pizza",
        description: "Pepperoni enak",
        image: "https://picsum.photos/200",
        sizes: { S: 10, M: 12, L: 14 },
      },
    ];
    fetchMocker.mockResponse(JSON.stringify(pizzas)); // jawaban palsu dari server

    const OrderRoute = Route.options.component;
    if (!OrderRoute) {
      throw new Error("order route has no component");
    }

    const screen = render(
      <Provider store={makeStore()}>
        <OrderRoute />
      </Provider>
    );

    expect(screen.getByText("LOADING …")).toBeDefined(); // awalnya loading

    const option = await screen.findByRole(
      "option",
      { name: "The Pepperoni Pizza" },
      { timeout: 6000 }
    );
    expect(option).toBeDefined(); // pizza muncul setelah data datang

    const requests = fetchMocker.requests();
    expect(requests[0].url).toBe("/api/pizzas"); // fetch ke alamat yang benar
  },
  10000 // timeout 10 dtk (Order sengaja menunda 3 dtk)
);
