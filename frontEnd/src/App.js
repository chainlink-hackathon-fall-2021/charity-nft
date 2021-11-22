import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import ParticlesBg from "particles-bg";
import LoginForm from "./login";
import { login } from "./store/reducers/loginReducer";
import Header from "./navbar/header";
import Dashboard from "./dashboard";
import CampaignForm from "./campaign/campaignForm";
import { Main } from '@aragon/ui'


// className="grey lighten-3" style={{height: '100vh'}}

const App = () => {
  
  return (
    <div>
        <BrowserRouter>
          {/* <ParticlesBg color='#1a237e' type="cobweb" bg={true} />   */}
          <Routes>
            <Route path='/campaignForm' element={<CampaignForm />} />
            <Route exact path='/' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      {/* </Main> */}
    </div>
  );
};

export default App;
