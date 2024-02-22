// pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import Navbar from "../components/NavBar";
import "../styles/index.css";
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
