import React from "react";
import ReactDOM from "react-dom";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import metaMaskLogo from '../resources/images/metamask.png'


const LoginForm = () => {

	const { authenticate } = useMoralis();

	
	return (
		<div className="container" style={{paddingTop: 40}}>
			<div className="card center black " style={{ borderRadius: 30 }}>
				{/* <img src="./resources/images/metamask.png" /> */}
				<img className="responsive-img small" src={metaMaskLogo} width='25%' height='25%' />
				<h1 style={{color: 'whitesmoke'}} > Connect with Metamask </h1>
				<div style={{ paddingBottom: 30 }}>
					<a onClick={() => authenticate({ signingMessage: "Hello World!" })}
					   className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Connect</a>
				</div>

			</div>
		</div>
	)
}

export default LoginForm