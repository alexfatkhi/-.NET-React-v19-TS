import { useState } from "react";
import { skipToken, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Tabel lama tidak punya class, jadi gaya element table/thead/td dipindah ke
// sini. min-width: 400px lama DIBUANG: kolomnya selalu >= 400px mulai 445px,
// jadi di desktop tidak berubah, tapi di HP justru membuat overflow.
const tableClass =
  "my-6.25 w-full border-collapse border border-[#dddddd] font-[family-name:sans-serif] text-[0.9em] [&_td]:px-3.75 [&_td]:py-3 [&_td]:text-center";
const headRowClass = "bg-secondary text-white";
const bodyRowClass =
  "border-b border-[#dddddd] even:bg-[#f6fef0] last:border-b-2 last:border-secondary";
const pageClass = "mx-auto min-h-162.5 w-[90%] max-w-225";

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState<number>();
  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  const { data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: focusedOrder ? () => getPastOrder(focusedOrder) : skipToken,
    staleTime: 24 * 60 * 60 * 1000, // one day in milliseconds,
  });

  if (isLoading) {
    return (
      <div className={pageClass}>
        <h2>LOADING …</h2>
      </div>
    );
  }

  if (!data) {
    throw new Error("Past orders could not be loaded");
  }

  return (
    <div className={pageClass}>
      <table className={tableClass}>
        <thead>
          <tr className={headRowClass}>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id} className={bodyRowClass}>
              <td>
                <button
                  className="btn"
                  onClick={() => setFocusedOrder(order.order_id)}
                >
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-evenly">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <div className="font-pacifico text-[20px] text-primary">{page}</div>
        <button
          className="btn"
          disabled={data.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {pastOrderData ? (
            <div className="overflow-x-auto">
              <table className={`${tableClass} min-w-100`}>
                <thead>
                  <tr className={headRowClass}>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Size</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  {pastOrderData.orderItems.map((pizza) => (
                    <tr
                      key={`${pizza.pizzaTypeId}_${pizza.size}`}
                      className={bodyRowClass}
                    >
                      <td>
                        <img
                          className="w-12.5"
                          src={pizza.image}
                          alt={pizza.name}
                        />
                      </td>
                      <td>{pizza.name}</td>
                      <td>{pizza.size}</td>
                      <td>{pizza.quantity}</td>
                      <td>{intl.format(pizza.price)}</td>
                      <td>{intl.format(pizza.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading …</p>
          )}
          <button className="btn" onClick={() => setFocusedOrder(undefined)}>
            Close
          </button>
        </Modal>
      ) : null}
    </div>
  );
}
