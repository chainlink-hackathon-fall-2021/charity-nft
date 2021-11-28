import M from 'materialize-css'
import { useState } from 'react';
import { LoremIpsum } from "lorem-ipsum";
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

// Accept
// const accept = async (abi, vote) => {
//     const { Web3API } = useMoralisWeb3Api()

//     const { Moralis } = useMoralis()

//     Moralis.getChainId

//     Web3API.native
    
// }


//Reject


const DropDown = (props) => {

    const {description} = props.data

    return (
        <div className='row'  style={{border: '2px solid black', borderTop: '0px'}}>

            <span className='col s12' style={{textAlign: 'left'}} >{description}</span>
            
            <span className='col s12' style={{textAlign: 'left', paddingTop: '10px'}} >KYC Information</span>

        </div>
    )
}


const RunningCampaignItem = (props) => {

    const [extended, setExtended] = useState(false)

    const { isWeb3Enabled } = useMoralis()
    const { Web3API } = useMoralisWeb3Api()

    // enableWeb3()

    const sendVote = async (vote) => {
        if (isWeb3Enabled){

            const ABI = []
            
            const options = {
                chain: "bsc",
                address: "0x...16",
                function_name: "allowance",
                abi: ABI,
                params: {owner: "0x1...2", spender: "0x1...2"}
            };
            
            const result = await Web3API.native.runContractFunction(options)
        }
    }

    const {heading, timeleft, votesRatio} = props.data

    return (
        <li onClick={() => setExtended(!extended)}>
            <div className='row' style={{padding: '10px', borderBottom: '1px solid black'}}>
                
                <div className='col s4 '>
                    
                    <span style={{float: 'left', fontSize: extended? '30px': '' }} >{heading}</span>
                    
                </div>

                <div className='col s2 '>
                    <span style={{float: 'right'}} >{timeleft} hr</span>
                </div>

                <div className='col s2 '>
                    <span style={{float: 'right', color: votesRatio >= 50? 'green':'red' }} >Vote Ratio(yes/no): {votesRatio}</span>
                </div>

                <div className='col s2 green' style={{borderRadius: 25, cursor: 'pointer'}} onClick={() => console.log('Yes')}>
                    <span>Yes</span>                    				
                </div>

                <div className='col s2 red' style={{borderRadius: 25, cursor: 'pointer'}} onClick={() => console.log('No')}>
                    <span>No</span>                    				
                </div>   
                            
            </div>
            {extended? <DropDown data={props.data} /> : <div />}
        </li>
    )
}




const RunningCampaigns = () => {

    const sampleData = {
        heading: 'Cat Power',
        description: lorem.generateParagraphs(1),
        timeleft: '13',
        votesRatio: 46

    }

    
    return (
        <div>
            <ul className='grey lighten-4'>
                <div className='card' style={{padding: '10px'}} >
                <RunningCampaignItem heading="Cat Power" timeleft="13" description={lorem.generateParagraphs(1)} data={sampleData}/>
                <RunningCampaignItem heading="Cat Power" timeleft="13" data={sampleData}/>
                <RunningCampaignItem heading="Cat Power" timeleft="13" data={sampleData}/>
                <RunningCampaignItem heading="Cat Power" timeleft="13" data={sampleData}/>
                <RunningCampaignItem heading="Cat Power" timeleft="13" data={sampleData}/>
                </div>
                
            </ul>
        </div>
    )
}

export default RunningCampaigns