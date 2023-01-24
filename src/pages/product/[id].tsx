import { stripe } from "@/src/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/pages/product";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
// import { useRouter } from "next/router";
import Stripe from "stripe";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { Product } from "use-shopping-cart/core";

interface ProductProps {
  product: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    currency: string;
  };
}

export default function ProductPage({ product }: ProductProps) {
  const { addItem, setItemQuantity } = useShoppingCart();
  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
  //   useState(false);
  // const { isFallback } = useRouter();

  async function handleAddToCart() {
    addItem(product);
    setItemQuantity(product.id, 1);
  }
  // if (isFallback || isCreatingCheckoutSession) {
  //   return <p>Loading</p>;
  // }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          {product.image && (
            <Image src={product.image} width={520} height={480} alt="" />
          )}
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {formatCurrencyString({ value: product.price, currency: "BRL" })}
          </span>

          <p>{product.description}</p>

          <button onClick={handleAddToCart}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados

  return {
    paths: [{ params: { id: "prod_NB4sbczhGMsvNi" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  const ProductData: Product = {
    id: product.id,
    description: product.description ? product.description : " ",
    name: product.name,
    image: product.images[0],
    price: price.unit_amount!,
    currency: price.currency,
  };

  return {
    props: {
      product: ProductData,
    },
    revalidate: 60 * 60 * 1, // 1 hora
  };
};
