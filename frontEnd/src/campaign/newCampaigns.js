import M from 'materialize-css'
import { useState, useEffect } from 'react';
import { LoremIpsum } from "lorem-ipsum";
import { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api } from 'react-moralis';
import {abi as AragonVotingAbi} from '../contracts/IVoting.json'


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


const DropDown = (props) => {
    const {description} = props.data
    return (
        <div className='row'  style={{border: '2px solid black', borderTop: '0px'}}>

            <span className='col s12' style={{textAlign: 'left'}} >{description}</span>
            
            <span className='col s12' style={{textAlign: 'left', paddingTop: '10px'}} >KYC Information</span>

        </div>
    )
}


const NewCampaignItem = (props) => {

    const [extended, setExtended] = useState(false)
    const {heading, timeleft} = props.data

    const { isWeb3Enabled, isWeb3EnableLoading, enableWeb3 } = useMoralis()
    const { Web3API } = useMoralisWeb3Api()
    useEffect(() => {
        if (!isWeb3Enabled) {
            if (!isWeb3EnableLoading) {
                enableWeb3()
            }
        }
    })


    const getVotingInfo = async () => {
        const aragonVotingContractAddress = '0x2c2e5397F336C29a991E9E1759085F9940ACe347'
        const options = {
            chain: 'mumbai',
            address: aragonVotingContractAddress,
            function_name: 'getVote',
            abi: AragonVotingAbi,
            params: {_voteId: 54}
        }
        const result = await Web3API.native.runContractFunction(options)

        console.log(result)
    }
    


    return (
        <li onClick={() => setExtended(!extended)}>
            <div className='row' style={{padding: '10px', borderBottom: '1px solid black'}}>
                
                <div className='col s6 '>
                    
                    <span style={{float: 'left', fontSize: extended? '30px': '' }} >{heading}</span>
                    
                </div>

                <div className='col s2 '>
                    <span style={{float: 'right'}} >{timeleft} hr</span>
                </div>

                <div className='col s2 green' style={{borderRadius: 25, cursor: 'pointer'}} onClick={() => console.log('Approve')}>
                    <span>Approve</span>                    				
                </div>

                <div className='col s2 red' style={{borderRadius: 25, cursor: 'pointer'}} onClick={() => console.log('Reject')}>
                    <span>Reject</span>                    				
                </div>   
                            
            </div>
            {extended? <DropDown data={props.data} /> : <div />}
        </li>
    )
}

const NewCampaigns = () => {

    const sampleData = {
        heading: 'Cat Power',
        description: lorem.generateParagraphs(1),
        timeleft: '13'

    }
    
    return (
        <div>
            <ul className='grey lighten-4'>
                <div className='card' style={{padding: '10px'}} >
                <NewCampaignItem  data={sampleData}/>
                <NewCampaignItem  data={sampleData}/>
                <NewCampaignItem  data={sampleData}/>
                <NewCampaignItem  data={sampleData}/>
                <NewCampaignItem  data={sampleData}/>
                </div>
                
            </ul>
        </div>
    )
}

export default NewCampaigns