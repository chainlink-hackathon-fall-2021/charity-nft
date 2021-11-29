import { useEffect, useState } from "react";
import Header from "../navbar/header";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
const Tokens = (props) => {
  const tokens = [
    {
      id: "#2283993",
      donationId: "Donation for dogs safety",
      number: 1000,
      data: "Compaign to fund dogs",
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
      attributes: [],
    },
    {
      id: "#2283994",
      donationId: "Donation for cats",
      number: 1001,
      data: "Compaign to fund animal protection",
      img: "https://images.unsplash.com/photo-1540411003967-af56b79be677?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      attributes: [],
    },
  ];
  return (
    <div>
      <Header />
      <div className="row center">
        <h3>Your PoD NFT Tokens</h3>
      </div>
      <div className="row center" style={{ margin: "30px" }}>
        {tokens.map((token, i) => {
          return (
            <div className="col xs12 s6 m3">
              {/* <div class="card">
                <div class="card-image" style={{ maxHeight: "400px" }}>
                  <img
                    style={{ backgroundSize: "100% 100%", height: "400px" }}
                    src={token.img}
                  />
                  <span class="card-title text-bold">{token.id}</span>
                </div>
                <div class="card-content">
                  <p>{token.data}</p>
                </div>
                <div class="card-action">
                  <a
                    href="#"
                    className="text-color-main"
                    style={{
                      color: "#5e62d4",
                    }}
                  >
                    Campaign details: {token.donationId}{" "}
                  </a>
                </div>
              </div> */}
              <div className="flip">
                <div
                  className="front"
                  style={{
                    backgroundImage: `url(${token.img})`,
                  }}
                >
                  <h1 className="text-shadow">{token.id}</h1>
                  <h5>$50,000</h5>
                </div>
                <div className="back">
                  <h2>{token.donationId}</h2>
                  <p>{token.data}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tokens;
