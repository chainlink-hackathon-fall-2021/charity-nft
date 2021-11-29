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
  useEffect(() => {
    if (!isWeb3Enabled) {
      if (!isWeb3EnableLoading) {
        enableWeb3();
      }
    } else if (user?.attributes?.ethAddress) {
    }
  }, [enableWeb3, user?.attributes?.ethAddress]);
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
      spender: window.config.DAI_ADDRESS,
      amount: depositAmount,
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
      _amount: depositAmount,
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
    depositDaiError,
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
            12% APR
          </span>
        </div>{" "}
      </div>
      <div class="card-tabs">
        <ul class="tabs tabs-fixed-width">
          <li class="tab">
            <a href="#deposit" className="active">
              Deposit Dai
            </a>
          </li>
          <li class="tab">
            <a href="#withdraw">Withdraw Dai</a>
          </li>
        </ul>
      </div>
      <div class="card-content">
        <div id="deposit">
          <h5 className="right">Balance: 1000</h5>
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
        <div id="withdraw">
          <h5 className="right">Balance: 1000</h5>
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

const Tokens = (props) => {
  return (
    <div className="row center">
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        1
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        2
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        3
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        4
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        5
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        6
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        7
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        8
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        9
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        10
      </div>
      <div
        className="col s2 red"
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        {" "}
        11
      </div>
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
