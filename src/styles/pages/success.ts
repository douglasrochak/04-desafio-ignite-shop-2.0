import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "2$xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
  },

  a: {
    display: "block",
    marginTop: "5rem",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImageContainer = styled("div", {
  padding: "0.25rem",
  marginTop: "4rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    boxShadow: "0px 0px 60px rgba(0, 0, 0, 0.8)",
    padding: "1rem",
    objectFit: "cover",
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: 99,
    width: 140,
    height: 140,
  },

  "img:not(:first-child)": {
    marginLeft: -50,
  },
});
