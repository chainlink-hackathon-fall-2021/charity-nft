import { Link, NavLink } from 'react-router-dom'
import { useMoralis } from "react-moralis";

const UserId = () => {
	const { isAuthenticated, user } = useMoralis();

	if (isAuthenticated) {
		return (
			<div>
				<li><a href=""><i className="material-icons left">person_outline</i>{user.get('username')}</a></li>
			</div>
		)
	}else {
		return(
			<div/>
		)
	}
}

const RightSide = () => {
	const { isAuthenticated, logout } = useMoralis();

	if (isAuthenticated) {
		return (
			<div>
				<NavLink to='/dashboard'> <li><a onClick={() => logout()} >Logout</a></li></NavLink>			
			</div>
		)
	}else {
		return (
			<div/>
		)
	}
}


const Header = () => {

	const { logout } = useMoralis();

	return (
		<nav>
			<div className="nav-wrapper indigo darken-4">
			<a href="#" className="brand-logo center">ENDOW</a>
			<ul className="left hide-on-med-and-down" id="nav-mobile" >
				<UserId />
			</ul>
			<ul className="right">
				<RightSide />
			</ul>
			</div>
		</nav>
	)

}

export default Header
