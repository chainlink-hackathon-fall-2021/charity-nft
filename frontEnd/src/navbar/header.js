import { Link, NavLink } from "react-router-dom";
import { useMoralis } from "react-moralis";

const SignedInLinks = () => {
  const { isAuthenticated, user, logout } = useMoralis();

  if (isAuthenticated) {
    return (
      <div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a style={{ fontSize: 18 }} className="text-color-main" href="">
              <i className="material-icons text-color-main left">
                person_outline
              </i>
              {user?.get("ethAddress")}
            </a>
          </li>
          <li>
            <NavLink to="/">
              {" "}
              <li>
                <a onClick={() => logout()} className="text-color-main">
                  {" "}
                  Logout
                </a>
              </li>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  } else {
    return <div />;
  }
};

const Header = () => {
  const { isAuthenticated } = useMoralis();

  return (
    <nav
      style={{
        boxShadow: "none",
        background: "none",
        paddingTop: "25px",
        minHeight: "115px",
        borderBottom: "1px solid rgb(63 81 181 / 18%)",
      }}
    >
      <div className="nav-wrapper">
        <NavLink to="/" className="left">
          <a href="/" className="brand-logo text-color-main table">
            <img
              src="https://www.clipartmax.com/png/full/159-1593840_logo-charity-donation-icon-%D0%B1%D0%BB%D0%B0%D0%B3%D0%BE%D1%82%D0%B2%D0%BE%D1%80%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C-%D0%BF%D0%BD%D0%B3.png"
              className="logo"
              alt="Endow"
              style={{
                verticalAlign: "middle",
              }}
            />
            <h2
              className="text-color-main inline-block logo-title"
              style={{
                margin: "10px",
                marginRight: "40px",
                verticalAlign: "middle",
              }}
            >
              Endow
            </h2>
            <NavLink to="/">
              {" "}
              <h5
                className="text-color-main inline-block text-bold"
                style={{
                  margin: "10px 20px",
                }}
              >
                Dashboard
              </h5>
            </NavLink>
            <NavLink to="/investmentProfile">
              {" "}
              <h5
                className="text-color-main inline-block text-bold"
                style={{
                  margin: "10px 20px",
                }}
              >
                Pools
              </h5>
            </NavLink>

            <h5
              className="text-color-main inline-block text-bold"
              style={{
                margin: "10px 20px",
              }}
            >
              Campaigns
            </h5>
            <NavLink to="/wallet">
              {" "}
              <h5
                className="text-color-main inline-block text-bold"
                style={{
                  margin: "10px 20px",
                }}
              >
                Wallet
              </h5>
            </NavLink>
          </a>
        </NavLink>
        {isAuthenticated ? <SignedInLinks /> : <div />}
      </div>
    </nav>
  );
};

export default Header;
