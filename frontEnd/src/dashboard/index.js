import ParticlesBg from "particles-bg";
import React from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
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
			<CreateCampaign />
			<CampaignList />
		</div>
	)
}

export default Dashboard