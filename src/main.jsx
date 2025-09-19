import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "@app/_styles/style.css";
import "@assets/fonts/noir-pro/styles.css";
import App from "@app/App";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  GOOGLEOAUTH_CLIENTID,
} from "@app/_utilities/constants/paths";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLEOAUTH_CLIENTID}>
  <App />
  </GoogleOAuthProvider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
