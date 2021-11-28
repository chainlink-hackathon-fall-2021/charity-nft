import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import ParticlesBg from "particles-bg";
import LoginForm from "./login";
import Header from "./navbar/header";
import Dashboard from "./dashboard";
import CampaignForm from "./campaign/campaignForm";
import { Main } from '@aragon/ui'
import CampaignBoard from "./campaign/campaignsBoard";
import InvestmentProfile from "./invest";




// className="grey lighten-3" style={{height: '100vh'}}

const App = () => {

  const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis()

  if (!isWeb3Enabled) {
    enableWeb3({provider: 'walletconnect'})
    return <div/>
  }

  return (
    <div>
        <BrowserRouter>
          <ParticlesBg color='#1a237e' type="cobweb" bg={true} />  
          <Routes>
            <Route path='/campaignForm' element={<CampaignForm />} />
            <Route path='/campaignBoard' element={<CampaignBoard />} />
            <Route path='/investmentProfile' element={<InvestmentProfile />} />
            <Route exact path='/' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      {/* </Main> */}
    </div>
  );
};

export default App;
