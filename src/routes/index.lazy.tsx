import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const linkClass = "btn mb-2.5 w-full max-w-62.5 text-center";

function Index() {
  return (
    <div className="mx-auto my-30 grid max-w-175 grid-cols-1 gap-7.5 px-4 md:grid-cols-2 md:px-0">
      <div className="flex flex-col">
        <h1 className="font-pacifico font-normal text-primary">Padre Gino's</h1>
        <p className="max-w-78.75 text-[40px] font-bold text-secondary uppercase">
          Pizza & Art at a location near you
        </p>
      </div>
      <ul className="flex flex-col items-center justify-center">
        <li className="w-full max-w-62.5 text-center">
          <Link to="/order" className={linkClass}>
            Order
          </Link>
        </li>
        <li className="w-full max-w-62.5 text-center">
          <Link to="/past" className={linkClass}>
            Past Orders
          </Link>
        </li>
        <li className="w-full max-w-62.5 text-center">
          <Link to="/contact" className={linkClass}>
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
