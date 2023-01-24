import axios from "axios";
import { X } from "phosphor-react";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

import {
  CartContainer,
  CartItemList,
  CheckoutButton,
  Close,
  Info,
  PriceWrapper,
  QuantityWrapper,
  Title,
} from "../styles/components/Cart";
import { CartItem } from "./CartItem";

interface CartProps {
  closeCart: () => void;
}
export function Cart({ closeCart }: CartProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  const { cartDetails, clearCart, formattedTotalPrice, removeItem, cartCount } =
    useShoppingCart();

  const totalItemsInCart = cartDetails ? Object.values(cartDetails).length : 0;

  async function handleCheckout() {
    try {
      setIsCreatingCheckout(true);
      const response = await axios.post("/api/checkout", {
        cartDetails,
      });

      clearCart();
      window.location.href = response.data.checkoutUrl;
    } catch (err) {
      setIsCreatingCheckout(false);
      console.log(err);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  function handleCloseCart() {
    closeCart();
  }

  return (
    <CartContainer>
      <div>
        <Close onClick={handleCloseCart}>
          <X weight="bold" color="#8D8D99" size={24} />
        </Close>
        <Title>Sacola de compras</Title>
        {totalItemsInCart > 0 ? (
          <CartItemList>
            {Object.values(cartDetails ?? {}).map((cartItem) => (
              <CartItem
                key={cartItem.id}
                id={cartItem.id}
                name={cartItem.name}
                price={cartItem.price}
                image={cartItem.image}
                removeCartItem={removeItem}
              />
            ))}
          </CartItemList>
        ) : (
          <p style={{ marginTop: "1rem" }}>
            Você ainda não adicionou items ao carrinho
          </p>
        )}
      </div>
      <Info>
        <div>
          <QuantityWrapper>
            <span className="quantity-1">Quantidade</span>
            <span className="quantity-2">{cartCount} itens</span>
          </QuantityWrapper>
          <PriceWrapper>
            <strong className="price-1">Valor total</strong>
            <strong className="price-2">{formattedTotalPrice}</strong>
          </PriceWrapper>
        </div>
        <CheckoutButton
          disabled={!cartCount || isCreatingCheckout}
          onClick={handleCheckout}
        >
          Finalizar compra
        </CheckoutButton>
      </Info>
    </CartContainer>
  );
}
