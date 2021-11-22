import React from "react";
import CampaignItem from "./campaignItem";



const CampaignList = () => {
	return (
		<div className="container">
			<h3>Recent Campaigns</h3>
			<div>
				<ul className="grey lighten-4"  style={{height: "600px", overflow: 'auto', padding: 10}}>
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					<CampaignItem heading='All hail the Shiba Coin' description="Clearly the best Coin available. So buy a few!" img="something" />
					
				</ul>
				
			</div>
		</div>
	)
}

export default CampaignList