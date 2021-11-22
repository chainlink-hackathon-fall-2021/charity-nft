import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { Provider } from 'react-redux'
import store from "./store";
import { createStore} from 'redux'


import {
  Connect,
  useApps,
  useOrganization,
  usePermissions,
} from '@aragon/connect-react'


const APP_ID = "oqQtHviKj3wmDpVNC9i5DznrPIpMrRkdHSk91adm";
const SERVER_URL = "https://ui9dcqkd2mzm.usemoralis.com:2053/server";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <App />
      </MoralisProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);