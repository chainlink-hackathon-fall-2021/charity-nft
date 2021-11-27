import ParticlesBg from "particles-bg";
import React from "react";
import { useMoralis } from "react-moralis";
import { Main, Card } from '@aragon/ui'
import { NavLink } from "react-router-dom";
import LoginForm from "../login";
import Header from "../navbar/header";
import CampaignList from "./campaignList";
import CreateCampaign from "./createCampaign";




const Dashboard = () => {
	const { isAuthenticated, user } = useMoralis();
	
	if (!isAuthenticated) {
		return (
		<div>
			<Header />
			<LoginForm />
		</div>
		);
	}

	return (
		<div>
			<Header />
			<div className="container center">
				{/* Total Amount and Donated Card  */}
				<div className="row" style={{paddingTop: 40, borderRadius: 40}}>
					{/* Headings */}

					<div className="card col s12 black" style={{ borderRadius: 25 }}>

						<div className="col s6">
							<div className='row center'>
								<h3 className="col s12" style={{color: 'white', fontSize: 70}} >$100,000</h3>
								<p className="col s12" style={{color: 'white', fontSize: 20}}>Total Amount Invested</p>
							</div>
						</div>

						<div className="col s6">
							<div className='row center'>
								<h3 className="col s12" style={{color: 'white', fontSize: 70}} >$50,000</h3>
								<p className="col s12" style={{color: 'white', fontSize: 20}}>Total Amount Donated</p>
							</div>

						</div>


					</div>
					
				</div>

				<div>
					<h2>Trusted and Transparent Fund-Rasing Platform</h2>
					<h2>Invest and Earn on your investment</h2>
				</div>

				<div className="center" style={{paddingTop: 40, borderRadius: 40}}>
					<div className='row'>
						<div className='card col s5 black center' style={{borderRadius: 25, height: '300px'}}>
							<div className='row'>
								<p className="col s12"  style={{color: 'white', fontSize: 120, margin: 0, paddingBottom: 0}}>15% APY</p>
								<p className="col s12" style={{color: 'white', fontSize: 30, margin: 0}} >Get Invested and Start Earning</p>
								<NavLink to='/investmentProfile'><a className="waves-effect green darken-1 btn">View Investments</a></NavLink>
							</div>
						</div>
						<div className='col s2' />
						<div className='card col s5 black center' style={{borderRadius: 25, height: '300px' }}>
							<div className='row'>
								<p className="col s12"  style={{color: 'white', fontSize: 100, margin: 0, paddingBottom: 0}}>$100,000</p>
								<p className="col s12" style={{color: 'white', fontSize: 20, margin: 0}} >Total Value Locked</p>
								<p className="col s12" style={{color: 'white', fontSize: 30, margin: 0}} >Vote for a Campaign</p>
								<NavLink to='/campaignBoard'><a className="waves-effect green darken-1 btn">View Campaigns</a></NavLink>
							</div>
						</div>
					</div>
					
				</div>



			</div>

			<CampaignList />
		</div>
	)
}

export default Dashboard