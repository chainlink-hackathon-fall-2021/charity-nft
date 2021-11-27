import { Link, NavLink } from 'react-router-dom'
import { useMoralis } from "react-moralis";


const SignedInLinks = () => {
	const { isAuthenticated, user, logout } = useMoralis();
	
	if (isAuthenticated) {
		return (
			<div>
				<ul id="nav-mobile" className="right hide-on-med-and-down">

					<li>
						<NavLink to='/campaignform'>
							<a className="waves-effect green btn">Create a Campaign<i className="material-icons right">group_work</i></a>	
						</NavLink>
					</li>	
						
					
					<li>
						<a style={{fontSize: 4}}  href=""><i className="material-icons left">person_outline</i>{user.get('username')}</a>
					</li>
					<li>
						<NavLink to='/'> <li><a onClick={() => logout()} >Logout</a></li></NavLink>	
					</li>
					
				</ul>
				
						
			</div>
		)
	}else {
		return (
			<div/>
		)
	}
}


const Header = () => {

	const { isAuthenticated } = useMoralis();

	return (
		<nav>
			<div className="nav-wrapper black">
			<NavLink to='/'><a href="/" className="brand-logo left">ENDOW</a></NavLink>
			{isAuthenticated? <SignedInLinks />: <div />}
			
			</div>
		</nav>
	)

}

export default Header
