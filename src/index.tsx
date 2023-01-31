import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BaseProvider } from "baseui";
import { theme } from "./config/theme";

// @ts-ignore
import {Helmet} from "react-helmet";


const engine = new Styletron();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StyletronProvider value={engine}>
    <Helmet>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Helmet>
    <BaseProvider theme={theme}>
      <App />
    </BaseProvider>
  </StyletronProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
