/* eslint-disable no-console */
//require("@babel/register");
const express = require("express");
const React = require("react");
import Root from "../root.component"; // Import your main React component.//Single-Spa apps provide a Root component by default.

const {
  renderToString,
  renderToStaticNodeStream,
} = require("react-dom/server");
const cors = require("cors");
const { ServerStyleSheet } = require("styled-components");

const app = express();
app.use(cors());
app.use(express.static("dist")); // Expose our webpack bundle for client side hydration
//app.use(express.static("public")); // OPTIONAL: Serve static assets like CSS, JS, and images

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

/**
 * Render html + css as static string
 */
app.get("/ssr", (req, res, next) => {
  const sheet = new ServerStyleSheet();
  const html = renderToString(
    sheet.collectStyles(<Root name="SSR Root [html]" />)
  );
  const styleTags = sheet.getStyleTags();
  res.send(styleTags.concat(html));
});

/**
 * Render html + css as stream (single-spa prefers a stream for performance)
 */
app.get("/ssr/stream", (req, res, next) => {
  const sheet = new ServerStyleSheet();
  const jsx = sheet.collectStyles(<Root name="SSR Root [stream]" />);

  const stream = sheet.interleaveWithNodeStream(renderToStaticNodeStream(jsx));
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`React SSR Server started on port ${port}`);
});
