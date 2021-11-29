import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Header from "../navbar/header";
import dai from "../resources/images/dai.png";
import usdc from "../resources/images/usdc.png";
import { abi as IERC20ABI } from "../contracts/IERC20.json";
import { abi as AAVEDAIDonorsPoolABI } from "../contracts/AAVEDAIDonorsPool.json";
const Portfolio = (props) => {
  return (
    <div
      className="card row"
      style={{ borderRadius: 25, border: "3px solid black" }}
    >
      <div className="col s2">
        <div className="row">
          <span
            className="col s12 center"
            style={{ fontSize: "20px", padding: "10px" }}
          >
            Savings Balance
          </span>
          <span className="col s12 center">$5000</span>
        </div>
      </div>

      <div className="col s2">
        <div className="row">
          <span
            className="col s12 center"
            style={{ fontSize: "20px", padding: "10px" }}
          >
            Share
          </span>
          <span className="col s12 center">5 %</span>
        </div>
      </div>

      <div className="col s2">
        <div className="row">
          <span
            className="col s12 center"
            style={{ fontSize: "20px", padding: "10px" }}
          >
            Interest Accrued
          </span>
          <span className="col s12 center">$750</span>
        </div>
      </div>

      <div className="col s2">
        <div className="row">
          <span
            className="col s12 center"
            style={{ fontSize: "20px", padding: "10px" }}
          >
            Donations
          </span>
          <span className="col s12 center">$5000</span>
        </div>
      </div>

      <div className="col s2">
        <div className="row">
          <span
            className="col s12 center"
            style={{ fontSize: "20px", padding: "10px" }}
          >
            Total Donated
          </span>
          <span className="col s12 center">$75</span>
        </div>
      </div>

      <div className="col s2">
        <div className="row">
          <span
            className="col s12 center"
            style={{ fontSize: "20px", padding: "10px" }}
          >
            Net Earning
          </span>
          <span className="col s12 center">$675</span>
        </div>
      </div>
    </div>
  );
};

const Pools = (props) => {
  // states
  const {
    isAuthenticated,
    user,
    web3,
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
  } = useMoralis();
  const [interestPercentage, setInterestPercentage] = useState(0);
  const [tab, setTab] = useState(0);
  const {
    data: balanceDai,
    error: balanceDaiError,
    fetch: balanceDaiFetch,
    isFetching: isFetchingBalanceDai,
    isLoading: isLoadingBalanceDai,
  } = useWeb3ExecuteFunction({
    abi: IERC20ABI,
    contractAddress: window.config.DAI_ADDRESS,
    functionName: "balanceOf",
    params: {
      account: user?.attributes?.ethAddress,
    },
  });
  useEffect(() => {
    if (!isWeb3Enabled) {
      if (!isWeb3EnableLoading) {
        enableWeb3();
      }
    } else {
      balanceDaiFetch();
    }
  }, [enableWeb3, isWeb3EnableLoading, balanceDaiFetch]);
  const [depositAmount, setDepositAmount] = useState(0);
  const {
    data: approveData,
    error: approveDaiError,
    fetch: approveDai,
    isFetching: isapproveFetching,
    isLoading: isApproveLoading,
  } = useWeb3ExecuteFunction({
    abi: IERC20ABI,
    contractAddress: window.config.DAI_ADDRESS,
    functionName: "approve",
    params: {
      spender: window.config.DONATION_POOL_ADDRESS,
      amount: web3.utils.toWei(`${depositAmount}`, "ether"),
    },
  });

  const {
    data: depositData,
    error: depositDaiError,
    fetch: depositDai,
    isFetching: isDaiDepositFetching,
    isLoading: isDepositDaiLoading,
  } = useWeb3ExecuteFunction({
    abi: AAVEDAIDonorsPoolABI,
    contractAddress: window.config.DONATION_POOL_ADDRESS,
    functionName: "deposit",
    params: {
      _amount: web3.utils.toWei(`${depositAmount}`, "ether"),
      _donationPercentage: web3.utils.toBN(interestPercentage),
    },
  });

  console.log({
    depositData,
    depositDaiError,
    isDaiDepositFetching,
    isDepositDaiLoading,
  });
  console.log({
    approveData,
    approveDaiError,
    isapproveFetching,
    isApproveLoading,
  });

  return (
    <div className="card" style={{ padding: "2%", borderRadius: 25 }}>
      <div class="card-content">
        <div className="row">
          <div className="col s1 table">
            <img
              src={dai}
              height="50px"
              className="vertical-align"
              width="50px"
            />
            <span
              className="vertical-align"
              style={{
                fontSize: "40px",
                paddingLeft: "15px",
                fontWeight: "bold",
              }}
            >
              DAI
            </span>
          </div>

          <span
            className="col s5 center right"
            style={{ height: "50%", fontSize: "50px" }}
          >
            3.6% APY
          </span>
        </div>{" "}
      </div>
      <div className="card-tabs">
        <ul className="tabs tabs-fixed-width">
          <li
            className="tab"
            onClick={() => {
              setTab(0);
            }}
          >
            <a href="#deposit" className="active">
              Deposit Dai
            </a>
          </li>
          <li
            className="tab"
            onClick={() => {
              setTab(1);
            }}
          >
            <a href="#withdraw">Withdraw Dai</a>
          </li>
        </ul>
      </div>
      <div className="card-content">
        {tab === 0 && (
          <div id="deposit">
            <h5 className="right">Balance: {balanceDai / 10 ** 18 || 0}</h5>
            <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <span class="prefix right">MAX</span>
                    <textarea
                      id="icon_prefix2"
                      class="materialize-textarea"
                      value={depositAmount}
                      onChange={(e) => {
                        setDepositAmount(e.target.value);
                      }}
                    ></textarea>
                    <label for="icon_prefix2">Deposit Amount</label>
                  </div>
                </div>
              </form>
            </div>
            {approveData && (
              <div className="row center" style={{ padding: "20px" }}>
                <div className="col s6">
                  <h5>Interest Percentage To Donate - {interestPercentage}%</h5>
                </div>
                <div className="col s4">
                  {" "}
                  <form action="#">
                    <p class="range-field">
                      <input
                        type="range"
                        value={interestPercentage}
                        onChange={(e) => {
                          setInterestPercentage(e.target.value);
                        }}
                        id="test15"
                        min="0"
                        max="100"
                      />
                    </p>
                  </form>
                </div>
              </div>
            )}
            <div className="row center">
              {(isApproveLoading ||
                isapproveFetching ||
                isDepositDaiLoading ||
                isDaiDepositFetching) && (
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
            <div className="row center">
              <button
                class="btn-large btn-base btn-large-override"
                onClick={() => {
                  approveDai();
                }}
                disabled={approveData || isApproveLoading || isapproveFetching}
              >
                Approve
              </button>
              <button
                class="btn-large btn-base btn-large-override"
                onClick={() => {
                  depositDai();
                }}
                disabled={
                  !approveData || isDepositDaiLoading || isDaiDepositFetching
                }
              >
                Deposit
              </button>
            </div>
          </div>
        )}

        <div id="withdraw">
          {tab === 1 && (
            <>
              <h5 className="right">Balance: {balanceDai / 10 ** 18 || 0}</h5>
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s12">
                      <span class="prefix right">MAX</span>
                      <textarea
                        id="icon_prefix2"
                        class="materialize-textarea"
                      ></textarea>
                      <label for="icon_prefix2">0.0</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row center">
                <a class="btn-large btn-base btn-large-override">Approve</a>
                <a class="btn-large btn-base btn-large-override disabled">
                  Withdraw
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* <div className="row">
        <a
          className="waves-effect btn-large btn-base col s2"
          style={{ marginTop: "2.25%" }}
        >
          Invest
        </a>
        <a
          className="waves-effect btn-base btn-large col s2"
          style={{ marginTop: "2.25%" }}
        >
          Remove
        </a>
      </div> */}

      {/* USDC */}
      {/* <div className="row">
        <div className="col s1">
          <img src={usdc} height="100px" width="100px" />
        </div>

        <span
          className="center  col s3 "
          style={{ height: "50%", fontSize: "70px" }}
        >
          USDC
        </span>

        <span
          className="col s4 center "
          style={{ height: "50%", fontSize: "60px" }}
        >
          Coming Soon
        </span>

        <a
          className="waves-effect grey darken-1 btn-large col s2 disabled"
          style={{ marginTop: "2.25%", borderRight: "1px solid black" }}
        >
          Invest
        </a>
        <a
          className="waves-effect red darken-3 btn-large col s2 disabled"
          style={{ marginTop: "2.25%" }}
        >
          Remove
        </a>
      </div> */}
    </div>
  );
};
const InvestmentProfile = () => {
  return (
    <div>
      <Header />
      {/* <h3 className='center'>Investment Profile</h3> */}
      <div className="container">
        {/* <Portfolio /> */}

        <h3 className="center">Available Pools</h3>
        <Pools />

        {/* <h3 className='center'>Proof of Donation Tokens</h3>
                <div className='center'>
                    <Tokens />
                </div> */}
      </div>
    </div>
  );
};

export default InvestmentProfile;
