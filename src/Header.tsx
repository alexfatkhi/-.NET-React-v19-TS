import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { CartContext } from "./contexts";

export default function Header() {
  const [cart] = useContext(CartContext);
  return (
    <nav className="grid w-full border-b border-[#ccc] [grid-template-areas:'._logo_logo_logo_cart']">
      <Link
        to={"/"}
        className="flex items-center justify-center [grid-area:logo]"
      >
        <h1 className="h-27.5 w-full border-b border-[#ccc] py-5 [content:url('/public/padre_gino.svg')] [grid-area:logo]">
          Padre Gino's Pizza
        </h1>
      </Link>
      <div className="flex items-center justify-center text-[40px] [grid-area:cart]">
        🛒
        <span
          className="relative -top-4.25 -left-4.25 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[18px] text-white"
          data-testid="cart-number"
        >
          {cart.length}
        </span>
      </div>
    </nav>
  );
}
