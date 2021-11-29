import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Moralis from "moralis";
import ParticlesBg from "particles-bg";
import LoginForm from "./login";
import Header from "./navbar/header";
import Dashboard from "./dashboard";
import CampaignForm from "./campaign/campaignForm";
import { Main } from "@aragon/ui";
import CampaignBoard from "./campaign/campaignsBoard";
import InvestmentProfile from "./invest";
import Wallet from "./wallet/wallet";

// className="grey lighten-3" style={{height: '100vh'}}

const App = () => {
  return (
    <div className="text-color-main">
      <BrowserRouter>
        {/* <ParticlesBg color="#5e62d4" type="cobweb" bg={true} /> */}
        <Routes>
          <Route path="/campaignForm" element={<CampaignForm />} />
          <Route path="/campaignBoard" element={<CampaignBoard />} />
          <Route path="/investmentProfile" element={<InvestmentProfile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      {/* </Main> */}
    </div>
  );
};

export default App;
