import ParticlesBg from "particles-bg";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import Header from "../navbar/header";
import NewCampaigns from "./newCampaigns";
import RunningCampaigns from "./runningCampaigns";
import CompletedCampaigns from "./completedCampaigns";
import RejectedCampaigns from "./rejectedCampaigns";



const CampaignBoard = () => {

    const activeColor = {
        textColor: 'white',
        buttonColor: 'black'

    }
    const nonActiveColor = {
        textColor: 'black',
        buttonColor: 'white'
    }

    const [activeTab, setActiveTab] = useState(0)

    const {isAuthenticated} = useMoralis()
    if (!isAuthenticated) {
        return (
            <div>
                <Header />
            </div>
        )
    }

    const tabViews = [<NewCampaigns />, <RunningCampaigns />, <CompletedCampaigns />, <RejectedCampaigns />]

    return (
        <div>
            <Header />
            <div className='container'>
            <div className="card center">

                <div className="row" style={{padding:'20px', borderBottom: '3px solid black'}}>
                    <div className='col s3' style={{padding: '0.5px'}}>
                        <a  className={" btn " + (activeTab==0? activeColor.buttonColor: nonActiveColor.buttonColor)} 
                            onClick={e => setActiveTab(0)}
                            style={{color: activeTab==0? activeColor.textColor : nonActiveColor.textColor, border: '1px solid black'}}
                        >New Campaigns</a>
                    </div>
                    <div className='col s3' style={{padding: '0.5px'}}>
                        <a  className={" btn " + (activeTab==1? activeColor.buttonColor: nonActiveColor.buttonColor)}
                            onClick={e => setActiveTab(1)}
                            style={{color: activeTab==1? activeColor.textColor : nonActiveColor.textColor, border: '1px solid black'}}
                        >Running Campaigns</a>
                    </div>
                    <div className='col s3' style={{padding: '0.5px'}}>
                        <a className={" btn " + (activeTab==2? activeColor.buttonColor: nonActiveColor.buttonColor)}
                            onClick={e => setActiveTab(2)}
                           style={{color: activeTab==2? activeColor.textColor : nonActiveColor.textColor, border: '1px solid black'}}
                        >Completed Campaigns</a>
                    </div>
                    <div className='col s3' style={{padding: '0.5px'}}>
                        <a  className={" btn " + (activeTab==3? activeColor.buttonColor: nonActiveColor.buttonColor)}
                            onClick={e => setActiveTab(3)}
                            style={{color: activeTab==3? activeColor.textColor : nonActiveColor.textColor, border: '1px solid black'}}
                        >Rejected Campaigns</a>
                    </div>
                </div>

                {tabViews[activeTab]}


            </div>
            </div>
        </div>
    )
}

export default CampaignBoard