import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";


const APP_ID = "Wn6GxXCsnyXwObrCLotla3LwwIMdP20fTcGDPcTk";
const SERVER_URL = "https://6klnrejkuhip.usemoralis.com:2053/server";

ReactDOM.render(
  <React.StrictMode>
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <App />
        </MoralisProvider>  
  </React.StrictMode>,
  document.getElementById("root")
);
