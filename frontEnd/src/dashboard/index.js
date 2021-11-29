import ParticlesBg from "particles-bg";
import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Main, Card } from "@aragon/ui";
import { NavLink } from "react-router-dom";
import LoginForm from "../login";
import Header from "../navbar/header";
import CampaignList from "./campaignList";
import CreateCampaign from "./createCampaign";
import { abi as AAVEDAIDonorsPoolABI } from "../contracts/AAVEDAIDonorsPool.json";
import { abi as LendingPoolABI } from "../contracts/ILendingPool.json";

const Dashboard = () => {
  // consts
  // from AAVE calculations https://docs.aave.com/developers/guides/apy-and-apr
  const RAY = 10 ** 27;
  const SECONDS_PER_YEAR = 31536000;
  // states
  const {
    isAuthenticated,
    user,
    web3,
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
  } = useMoralis();
  const [stats, setStats] = useState({
    deposit: 0,
    tvd: 0,
    tvl: 0,
    share: 0,
    shareValue: 0,
    depositAPR: 0,
    depositAPY: 0,
  });

  // hooks
  // get user deposits
  const {
    data: deposit,
    error: depositError,
    fetch: fetchDeposit,
    isFetching,
    isLoading: isDepositLoading,
  } = useWeb3ExecuteFunction({
    abi: AAVEDAIDonorsPoolABI,
    contractAddress: window.config.DONATION_POOL_ADDRESS,
    functionName: "deposits",
    params: {
      "": user?.get("ethAddress"),
    },
  });

  //  get total value donated
  const {
    data: tvd,
    error: tvdError,
    fetch: fetchTvd,
    isLoading: isTvdLoading,
  } = useWeb3ExecuteFunction({
    abi: AAVEDAIDonorsPoolABI,
    contractAddress: window.config.DONATION_POOL_ADDRESS,
    functionName: "tvd",
    params: {},
  });
  //  get total value locked by pool
  const {
    data: tvl,
    error: tvlError,
    fetch: fetchTvl,
    isLoading: isTvlLoading,
  } = useWeb3ExecuteFunction({
    abi: AAVEDAIDonorsPoolABI,
    contractAddress: window.config.DONATION_POOL_ADDRESS,
    functionName: "tvl",
    params: {},
  });

  // get earnings
  const {
    data: earning,
    error: earningError,
    fetch: fetchearning,
    isLoading: isEarningLoading,
  } = useWeb3ExecuteFunction({
    abi: AAVEDAIDonorsPoolABI,
    contractAddress: window.config.DONATION_POOL_ADDRESS,
    functionName: "getEarnings",
    params: {},
  });

  // get user share
  const {
    data: share,
    error: shareError,
    fetch: fetchShare,
    isLoading: isShareLoading,
  } = useWeb3ExecuteFunction({
    abi: AAVEDAIDonorsPoolABI,
    contractAddress: window.config.DONATION_POOL_ADDRESS,
    functionName: "getShare",
    params: {},
  });

  // get APY from AAVE
  // get user share
  const {
    data: reserveData,
    error: reserveDataError,
    fetch: fetchReserveData,
    isLoading: isReserveDataLoading,
  } = useWeb3ExecuteFunction({
    abi: LendingPoolABI,
    contractAddress: window.config.LENDING_POOL_ADDRESS,
    functionName: "getReserveData",
    params: {
      asset: window.config.DAI_ADDRESS,
    },
  });
  console.log(share);
  useEffect(() => {
    if (!isDepositLoading && deposit) {
      setStats((stats) => ({
        ...stats,
        deposit,
      }));
    }
    if (!isTvdLoading && tvd) {
      setStats((stats) => ({
        ...stats,
        tvd,
      }));
    }
    if (!isTvlLoading && tvl) {
      setStats((stats) => ({
        ...stats,
        tvl,
      }));
    }
    if (!isEarningLoading && earning) {
      setStats((stats) => ({
        ...stats,
        earning,
      }));
    }
    if (!isShareLoading && share) {
      setStats((stats) => ({
        ...stats,
        share: share.share,
        shareValue: share.shareValue,
      }));
    }
    if (!isShareLoading && reserveData) {
      const _depositAPR = parseInt(reserveData.currentLiquidityRate) / RAY;
      setStats((stats) => ({
        ...stats,
        depositAPR: _depositAPR / 100,
        depositAPY:
          (((1 + _depositAPR / SECONDS_PER_YEAR) ^ SECONDS_PER_YEAR) - 1) / 100,
      }));
    }
  }, [
    deposit,
    isDepositLoading,
    tvd,
    isTvdLoading,
    tvl,
    isTvlLoading,
    earning,
    isEarningLoading,
    share,
    isShareLoading,
    reserveData,
    isReserveDataLoading,
  ]);
  useEffect(() => {
    if (!isWeb3Enabled) {
      if (!isWeb3EnableLoading) {
        enableWeb3();
      }
    } else if (user?.attributes?.ethAddress) {
      fetchDeposit();
      fetchearning();
      fetchTvd();
      fetchShare();
      fetchReserveData();
      fetchTvl();
    }
  }, [
    enableWeb3,
    fetchDeposit,
    fetchTvd,
    fetchearning,
    fetchShare,
    fetchReserveData,
    fetchTvl,
    isWeb3Enabled,
    isWeb3EnableLoading,
    user?.attributes?.ethAddress,
  ]);

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
        {/* <div className="text-color-main">
          <h2>Trusted and Transparent Fund-Rasing Platform</h2>
          <h2>Invest and Earn on your investment</h2>
        </div> */}
        {/* Total Amount and Donated Card  */}
        <h2
          class="display-4 "
          style={{ marginTop: "80px", marginBottom: "60px" }}
        >
          Endow is community governed donation platform to fund social compaigns
          by leveraging best interests from DeFi platforms.
        </h2>
        <div className="row" style={{ paddingTop: 40, borderRadius: 40 }}>
          {/* Headings */}

          <div className="card col s12" style={{ borderRadius: 25 }}>
            <div className="col s4">
              <div className="row center">
                <h3 className="col s12" style={{ fontSize: 70 }}>
                  {`$${stats?.deposit}`}
                </h3>
                <p className="col s12" style={{ fontSize: 20 }}>
                  You Invested
                </p>
              </div>
            </div>
            <div className="col s4">
              <div className="row center">
                <h3 className="col s12" style={{ fontSize: 70 }}>
                  {`$${stats?.shareValue}`}
                  {/* <span style={{ fontSize: 15 }}>
                    ({stats?.share ? `${stats?.shareValue} %` : "N/A"})
                  </span> */}
                </h3>

                <p className="col s12" style={{ fontSize: 20 }}>
                  Your Share
                </p>
              </div>
            </div>

            <div className="col s4">
              <div className="row center">
                <h3 className="col s12" style={{ fontSize: 70 }}>
                  {`$${stats?.tvd}`}
                </h3>
                <p className="col s12" style={{ fontSize: 20 }}>
                  Total Amount Donated
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="center" style={{ paddingTop: 40, borderRadius: 40 }}>
          <div className="row">
            <div className="card col s5 center" style={{ borderRadius: 25 }}>
              <div className="row">
                <p
                  className="col s12"
                  style={{
                    fontSize: 70,
                    margin: 0,
                    paddingBottom: 0,
                  }}
                >
                  {stats.depositAPR && stats.depositAPR.toFixed(2)}% APR
                  {/* {stats.depositAPY}% APY */}
                </p>
                <h5>
                  ({stats.depositAPY && stats.depositAPY.toFixed(2)}% APY)
                  {/* {stats.depositAPY}% APY */}
                </h5>
                <h6 className="table">
                  <span className="vertical-align">Powered by</span>
                  <img
                    src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2Fdocs.aave.com%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-M3C77KySce4HXyLqkEq%252Favatar-1595317552448.png%3Fgeneration%3D1595317552841170%26alt%3Dmedia"
                    className="logo-small vertical-align"
                    alt=""
                  />
                </h6>
                <p
                  className="col s12"
                  style={{ color: "white", fontSize: 30, margin: 0 }}
                >
                  Get Invested and Start Earning
                </p>
                <NavLink to="/investmentProfile">
                  <a className="waves-effect text-color-bg darken-1 btn">
                    View Investments
                  </a>
                </NavLink>
              </div>
            </div>
            <div className="col s2" />
            <div
              className="card col s5 center"
              style={{ borderRadius: 25, height: "300px" }}
            >
              <div className="row">
                <p
                  className="col s12"
                  style={{
                    fontSize: 100,
                    margin: 0,
                    paddingBottom: 0,
                  }}
                >
                  <h3 className="col s12" style={{ fontSize: 70 }}>
                    {`$${stats?.tvl}`}
                  </h3>
                </p>
                <p className="col s12" style={{ fontSize: 20, margin: 0 }}>
                  Total Value Locked
                </p>
                <p className="col s12" style={{ fontSize: 30, margin: 0 }}>
                  Vote for a Campaign
                </p>
                <h6 className="table">
                  <span className="vertical-align">Powered by</span>
                  <img
                    src="https://assets.website-files.com/602ced7da46f594dd6700e15/602cf7ea9fc1f41358f0ae27_5e99778310343ed2dfe89331_logo_big.svg"
                    className="logo-small vertical-align"
                    alt=""
                  />
                </h6>
                <NavLink to="/campaignBoard">
                  <a className="waves-effect text-color-bg darken-1 btn">
                    View Campaigns
                  </a>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <CampaignList /> */}
    </div>
  );
};

export default Dashboard;
