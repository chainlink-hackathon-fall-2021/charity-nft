import React from "react";
import { Tabs } from 'react-simple-tabs-component'
// import 'react-simple-tabs-component/dist/index.css'
import CampaignItem from "./campaignItem";
import M from 'materialize-css'

const Sample = () => {
	return (
		<div />
	)
}

// Tabs structure Array
const tabs = [
	{
	  label: 'New Campaigns', // Tab Title - String
	  Component: Sample // Tab Body - JSX.Element
	},
	{
	  label: 'Running Campaigns',
	  Component: Sample
	},
	{
	  label: 'Completed Campaigns',
	  Component: Sample
	}
  ]

const CampaignList = () => {

	// var instance = M.Tabs.init();
	M.AutoInit()

	return (
		<div className="container" >
			<div className="row center" >
				<p className="" style={{fontSize: 40, margin: 0, padding: 0}}  >Recently Funded Campaigns</p>				
			</div>
			<div>
			
				<ul className="grey lighten-4"  style={{height: "400px", overflow: 'auto', padding: 10}}>
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					
				</ul>
				
			</div>
		</div>
	)
}

export default CampaignList