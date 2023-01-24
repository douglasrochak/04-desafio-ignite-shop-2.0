import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",

    margin: 0,
    padding: 0,
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
    backgroundColor: "$gray900",
    color: "$gray100",
    overflow: "hidden",
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
});
