import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import { CartProvider } from "use-shopping-cart";
import { Cart } from "../components/Cart";
import { useState } from "react";
import { HeaderComponent } from "../components/HeaderComponent";
import { Container } from "../styles/pages/app";

globalStyles();
export default function App({ Component, pageProps }: AppProps) {
  const [isCartOpen, setCartOpen] = useState(false);

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  return (
    <CartProvider
      shouldPersist={true}
      cartMode="checkout-session"
      stripe={
        "pk_test_51MQiGcLUiWaaIPT85h2XoFhN8xlAQqJl9EMNtza6C7jfjbJeGzT01SkdZSHChdG7AINJK8dh9twQG8wz5UaLvRU400XVzMkybP"
      }
      currency="BRL"
    >
      <Container>
        <HeaderComponent openCart={openCart} />
        <Component {...pageProps} />
        {isCartOpen && <Cart closeCart={closeCart} />}
      </Container>
    </CartProvider>
  );
}
