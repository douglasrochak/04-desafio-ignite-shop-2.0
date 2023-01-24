import Image from "next/image";
import Head from "next/head";

import { Product } from "use-shopping-cart/core";

import { useKeenSlider } from "keen-slider/react";

import {
  AddToCartButton,
  HomeContainer,
  ProductStyle,
} from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { Handbag } from "phosphor-react";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

interface HomeProps {
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
    currency: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { addItem, setItemQuantity } = useShoppingCart();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={"/product/" + product.id}
              key={product.id}
              prefetch={false}
            >
              <ProductStyle className="keen-slider__slide">
                <Image src={product.image} width={520} height={480} alt={""} />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      {formatCurrencyString({
                        value: product.price,
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <AddToCartButton
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(product);
                      setItemQuantity(product.id, 1);
                    }}
                  >
                    <Handbag color="#FFF" size={24} />
                  </AddToCartButton>
                </footer>
              </ProductStyle>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products: Product[] = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      description: product.description ? product.description : " ",
      name: product.name,
      image: product.images[0],
      price: price.unit_amount!,
      currency: price.currency,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
