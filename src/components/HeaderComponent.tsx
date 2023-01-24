import { Handbag } from "phosphor-react";

import logoIMG from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { CartButton, Header } from "../styles/components/HeaderComponent";

interface HeaderComponentProps {
  openCart: () => void;
}

export function HeaderComponent({ openCart }: HeaderComponentProps) {
  const { cartCount } = useShoppingCart();

  function handleOpenCart() {
    openCart();
  }

  return (
    <Header>
      <Link href={"/"} prefetch={false}>
        <Image src={logoIMG} alt="" />
      </Link>
      <CartButton disabled={!cartCount} onClick={handleOpenCart}>
        {!!cartCount && <span className="items-in-cart">{cartCount}</span>}
        <Handbag color="#8D8D99" size={24} />
      </CartButton>
    </Header>
  );
}
