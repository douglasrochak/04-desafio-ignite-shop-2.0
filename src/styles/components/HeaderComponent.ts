import { styled } from "..";

export const CartButton = styled("button", {
  position: "relative",

  padding: "1rem",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: 8,
  background: "$gray800",

  "span.items-in-cart": {
    position: "absolute",
    top: -9,
    right: -9,

    boxSizing: "content-box",
    border: "3px solid #121214",
    fontSize: "0.75rem",
    color: "$white",
    background: "$green500",
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },

  "&:hover": {
    cursor: "pointer",
    opacity: 0.6,
    transition: "opacity 0.2s",
  },

  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
  },
});

export const Header = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
});
