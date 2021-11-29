# Endow

EnDow is an application developed by the following team🥇 as a submission to the 

Abdul Wasay Mehar - github: @masterrom 
Francisco Angulo D - github: @ttymarucr
David Krett - github: @eydbk
Anand Singh - github: @darknightdev

## Problem Being Addressed

- The problem our application addresses, is it provides a easy and UX friendly way for Crypto Hodlers to "stake" there investments and use the rewards generated via yield farming amongst selected low risk lending products

Endow - Is a DeFi proof of donation investment product (nfts) targeted towards HODLERS who want to share their investment rewards from yield farming with community selected (DAO voting) charitable campaigns.

## Inspiration
- our inspiration for this project are the many crypto investors who are HODLERS - our project gives the opportunity for these Hodlers to share yield opportunies by investing in low risk lending protocols and allocating rewards owned to socially beneficial campaigns as donations

## What it does

- investors can invest their crypto holding in Endow
- investors investments are invested in a lending product (currently DAI - more to be added later) 
- investors are issued Endow governance tokens for their investment - in future we will also issue share tokens to provide liquidity
- these investments are invested in AAVE via Endow's governance DAO (Aragon)
- Campaigner can post a socially beneficial campaign for donations on Endow - when they post their campaign they are issued with an NFT
- Investors vote via the DAO as to which Campaigns can elegible for donations from earnings on the investment pool
- During a predesignated voting periods - investors can use their governance tokens to selectively allocate their rewards for donation to the elegible campaigns in the donors pool
- At the end of each voting period the investors rewards and donations are recalculated - the investor receives a Proof of Donation ERC 1155 NFT issued by each campaign they have donated to as an official receipt for their donations

## How we built it

- hardhat chainlink starter
- solidity smart contracts
- react UI
- Aragon Dao
- Aave
- Moralis
- Alchemy
- Polygon
- Chainlink Keepers
- ERC1155 @openzeppelin 

## Challenges we ran into
- time we all have full time jobs
## Accomplishments that we're proud of
- how we were able to integrate modular components ie chainlink, openzepplin, aragon dao, aave into an easy to use investment protocol
- issuing nfts to represent each campaign and erc1155 Proof of Donation tokens

## What we learned
- DAO protocols, Ave
## What's next for Endow
- further development including share tokens, security review 
- deployment of UI to IPFS
- additional investment protocols

## Smart Contracts
To facilitate our application several smart contracts were developed - as follows

- ITokenManager.sol - manages governance token issuance and burning with the Aragon Smart Contract
- IVoting.sol - manages voting for elegible campaigns and for selecting for each investor supported campaigns
- CampaignLauncher.sol - manages the workflow for a campaigner to submit, obtain approval and donations for each campaign - this contract also manages the issuance of NFTS for campaigns as well as NFTS for proof of donation by calling the EndowTokenManager.sol contract
- CampaignVotingManager.sol - manages the submission of campaigns for voting
- CampaignDonationKeeper.sol - A keeper is used to get the donation votes for each campaign
- CampaignReviewKeeper.sol - A keeper that manages the approval vote for any newly submitted campaigns
- AAVEDAIDDonorsPool.sol - A contract for managing investors investments into the investment/donation pool
- IDonor.sol - interface to track donations
  
## Polygon Mumbai Testnet Addresses

| Contract               | Address                                    | Description                                                  |
| ---------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| Aragon Test DAO        | 0xc22165a525FCD9ad5560Db2648aB0a227163292B | Endow Organization endowtest.aragonid.eth                    |
| Tokens                 | 0x91Caa6F060dE7EF698f1EAcd76EdF0125220a9a6 | ERC1155 Token                                                |
| AAVEDAIDonorsPool      | 0x13125A3753E0b60fA16f2337404B7A9ee6732832 | AAVE DAI Donors Pool                                         |
| CampaignLauncher       | 0xdf40fa55F4e41c43FE1dAcdf8Ab160D57eC83c8E | Takes care of campaigns life cycle                           |
| CampaignReviewKeeper   | 0x7d1564121e69B52885286ea27E2a557C31D6838b | Chainlink Keeper that tracks the creation of new campaigns that are waiting for a review from Endow DAO |
| CampaignDonationKeeper | 0x060cc0fe4Eee5AEf5774Cac4ee6b8D024ad67Ccd | Chainlink Keeper that tracks any campaign that requires a donation from the donors pool |



## Sequence Diagram


![Sequence Diagram](https://github.com/chainlink-hackathon-fall-2021/charity-nft/blob/016a9c7dccaab878e1344199c24676514590015e/docs/diagrams/Campaigns.png)

## WhiteBoard Mockups
- please see docs folder
