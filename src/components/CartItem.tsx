import Image from "next/image";
import { formatCurrencyString } from "use-shopping-cart";
import {
  CartItemContainer,
  ImageBackground,
  Info,
} from "../styles/components/CartItem";

interface CartItemProps {
  id: string;
  name: string;
  image?: string;
  price: number;
  removeCartItem: (id: string) => void;
}

export function CartItem({
  id,
  name,
  image,
  price,
  removeCartItem,
}: CartItemProps) {
  function handleRemoveCartItem() {
    removeCartItem(id);
  }

  return (
    <CartItemContainer>
      <ImageBackground>
        {image && <Image width={95} height={95} src={image} alt="" />}
      </ImageBackground>
      <Info>
        <span>{name}</span>
        <strong>
          {formatCurrencyString({ value: price, currency: "BRL" })}
        </strong>
        <span className="btn-remove" onClick={handleRemoveCartItem}>
          Remover
        </span>
      </Info>
    </CartItemContainer>
  );
}
