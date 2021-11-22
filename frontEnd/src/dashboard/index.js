import ParticlesBg from "particles-bg";
import React from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { Main, Card } from '@aragon/ui'
import { NavLink } from "react-router-dom";
import LoginForm from "../login";
import Header from "../navbar/header";
import { login } from "../store/reducers/loginReducer";
import CampaignList from "./campaignList";
import CreateCampaign from "./createCampaign";




const Dashboard = () => {
	const { isAuthenticated, user } = useMoralis();

	const dispatch = useDispatch()

	if (!isAuthenticated) {
		return (
		<div>
			<Header />
			<LoginForm />
		</div>
		);
	}

	dispatch(login(user))

	return (
		<div>
			<Header />
			<div className="container center">
				{/* Total Amount and Donated Card  */}
				<div className="row" style={{paddingTop: 40, borderRadius: 40}}>
					{/* Headings */}

					<div className="card col s6 black">
						<div className="row">
							<h4 className="col s12" style={{color: 'white'}}>Total Amount Invested</h4>
							<h3 className="col s12" style={{fontWeight: "bold", color: 'white'}} >$100,000</h3>
						</div>
					</div>

					<div className="card col s6 black">
						<div className="row">
							<h4 className="col s12" style={{color: 'white'}} >Total Amount Doanted</h4>
							<h3 className="col s12" style={{fontWeight: "bold", color: 'white'}} >$50,000</h3>
						</div>
					</div>

					
				</div>

				<div>
					<h2>Trusted and Transparent Fund-Rasing Platform</h2>
					<h2>Invest and Earn on your investment</h2>
				</div>

				<div className="row" style={{paddingTop: 40, borderRadius: 40}}>
					{/* Headings */}

					<div className="card col s5 off-set s2 black">
						<div className="row">
						<h4 className="col s12" style={{color: 'white'}} >Get Invested and Start Earning at 15% APY</h4>
						
						<NavLink to='/campaignform'><a className="waves-effect green btn"><i class="material-icons left">attach_money</i>Invest</a></NavLink>
							
						</div>
					</div>
					<div className="col s2" />
					<div className="card col s5 black">
						<div className="row">
							<h4 className="col s12" style={{color: 'white'}} >Have a burning idea or a cause?</h4>
							<NavLink to='/campaignform'><a className="waves-effect yellow darken-1 btn"><i class="material-icons left">group_work</i>Create a Campaign</a></NavLink>


						</div>
					</div>

					
				</div>



			</div>

			<CampaignList />
		</div>
	)
}

export default Dashboard