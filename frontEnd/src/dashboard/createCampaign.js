
import React from "react";
import { NavLink } from "react-router-dom";



const CreateCampaign = () => {
	return (
		<div className="container">
			<div className="card center whitesmoke" style={{paddingTop: '3%', paddingBottom: '3%', borderRadius: 40, borderColor: '#1a237e', borderWidth: 10}}>
				<h3>Trusted and Transparent Fund-Rasing Platform</h3>
				<h4>Have a burning idea or a cause?</h4>
				<NavLink to='/campaignform'><a className="waves-effect waves-light btn"><i className="material-icons left">group_work</i>Create a Campaign</a></NavLink>
			</div>
		</div>
	)
}

export default CreateCampaign