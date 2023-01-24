import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    image: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          {products.map((product) => (
            <Image
              key={product.id}
              src={product.image}
              width={120}
              height={110}
              alt=""
            />
          ))}
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de
          <strong> {products.length}</strong> camiseta
          {products.length > 1 && "s"} já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const products = session.line_items?.data.map((product) => {
    const stripeProduct = product.price?.product as Stripe.Product;
    return {
      id: product.id,
      image: stripeProduct.images[0],
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
