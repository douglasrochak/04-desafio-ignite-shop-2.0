import { styled, keyframes } from "..";

const cartTransition = keyframes({
  from: {
    transform: "translate3d(500px, 0, 0)",
  },
  to: {
    transform: "translate3d(0, 0, 0)",
  },
});

export const CartContainer = styled("div", {
  animation: `${cartTransition}  .3s ease-in-out`,
  position: "absolute",
  top: 0,
  right: 0,

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  padding: "4.5rem 3rem 3rem",
  width: 480,
  height: "100vh",
  background: "$gray800",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",
});

export const Close = styled("div", {
  position: "absolute",
  top: 24,
  right: 24,

  cursor: "pointer",
  "&:hover": {
    opacity: 0.6,
    transition: "opacity 0.2s",
  },
});

export const Title = styled("span", {
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "$gray100",
});

export const CartItemList = styled("div", {
  height: "100%",
  marginTop: "2rem",
  maxHeight: "550px",

  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  overflowY: "auto",
});

export const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "3.5rem",
});

export const QuantityWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.5rem",

  "span.quantity-2": {
    fontSize: "$lg",
    color: "$gray300",
  },
});

export const PriceWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  "strong.price-1": {
    fontSize: "$md",
  },

  "strong.price-2": {
    fontSize: "$xl",
  },
});

export const CheckoutButton = styled("button", {
  width: "100%",
  backgroundColor: "$green500",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$md",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:hover": {
    backgroundColor: "$green300",
    transition: "background 0.2s",
  },
});
