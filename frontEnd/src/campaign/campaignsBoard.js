import ParticlesBg from "particles-bg";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import Header from "../navbar/header";
import NewCampaigns from "./newCampaigns";
import RunningCampaigns from "./runningCampaigns";
import CompletedCampaigns from "./completedCampaigns";
import RejectedCampaigns from "./rejectedCampaigns";


const tabHints = [
    `Look through the campaigns, and either Approve a campaign if you think it should be considered by the donation pool, or Reject if you think otherwise`,
    'If you wish to donate your earnings to a campaign, click Yes for the campaign',
    'List of campaigns that have been give a donation',
    'Campaigns which were not Approved for donations'
]


const CampaignBoard = () => {

    const activeColor = {
        textColor: 'white',
        buttonColor: 'text-color-bg'

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

                <h3 className='center'>Campaigns</h3>
                <h5 className='center' >{tabHints[activeTab]}</h5>


            <div className="card center" style={{padding: '10px'}}>

                <div className="row" style={{padding:'20px', borderBottom: '3px solid #5e62d4'}}>
                    <div className='col s3' style={{padding: '0.5px'}}>
                        <a  className={" btn " + (activeTab==0? activeColor.buttonColor: nonActiveColor.buttonColor)} 
                            onClick={e => setActiveTab(0)}
                            style={{color: activeTab==0? activeColor.textColor : nonActiveColor.textColor, border: '1px solid #5e62d4'}}
                        >New Campaigns</a>
                    </div>
                    <div className='col s3' style={{padding: '0.5px'}}>
                        <a  className={" btn " + (activeTab==1? activeColor.buttonColor: nonActiveColor.buttonColor)}
                            onClick={e => setActiveTab(1)}
                            style={{color: activeTab==1? activeColor.textColor : nonActiveColor.textColor, border: '1px solid #5e62d4'}}
                        >Running Campaigns</a>
                    </div>
                    <div className='col s3' style={{padding: '0.5px'}}>
                        <a className={" btn " + (activeTab==2? activeColor.buttonColor: nonActiveColor.buttonColor)}
                            onClick={e => setActiveTab(2)}
                           style={{color: activeTab==2? activeColor.textColor : nonActiveColor.textColor, border: '1px solid #5e62d4'}}
                        >Completed Campaigns</a>
                    </div>
                    <div className='col s3' style={{padding: '0.5px'}}>
                        <a  className={" btn " + (activeTab==3? activeColor.buttonColor: nonActiveColor.buttonColor)}
                            onClick={e => setActiveTab(3)}
                            style={{color: activeTab==3? activeColor.textColor : nonActiveColor.textColor, border: '1px solid #5e62d4'}}
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