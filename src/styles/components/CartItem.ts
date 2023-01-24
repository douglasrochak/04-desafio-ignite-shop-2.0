import { styled } from "..";

export const CartItemContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const ImageBackground = styled("div", {
  width: 100,
  height: 95,
  borderRadius: 6,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
});

export const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",

  "span.btn-remove": {
    fontWeight: "bold",
    fontSize: "1rem",
    background: "none",
    border: 0,
    color: "$green500",

    "&:hover": {
      color: "$green300",
      transition: "color 0.2s",
      cursor: "pointer",
    },
  },
});
