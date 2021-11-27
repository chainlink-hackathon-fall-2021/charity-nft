import M from 'materialize-css'
import { useState } from 'react';
import { LoremIpsum } from "lorem-ipsum";

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
    const { description,rejectionReason } = props.data

    return (
        <div className='row'  style={{border: '2px solid black', borderTop: '0px'}}>
            
            <span className='col s12' style={{textAlign: 'left', color: 'red', fontWeight: 'bold', paddingBottom: '3px'}}>{rejectionReason}</span>
            
            <span className='col s12' style={{textAlign: 'left'}} >{description}</span>
            <span className='col s12' style={{textAlign: 'left', paddingTop: '10px'}} >KYC Information</span>

        </div>
    )
}


const RejectedCampaignItem = (props) => {

    const [extended, setExtended] = useState(false)

    const { heading } = props.data

    return (
        <li onClick={() => setExtended(!extended)}>
            <div className='row' style={{padding: '10px', borderBottom: '1px solid black'}}>
                
                <div className='col s6 '>
                    
                    <span style={{float: 'left', fontSize: extended? '30px': '' }} >{heading}</span>
                    
                </div>

                <div className='col s4 '>
                    <span style={{float: 'right'}} ></span>
                </div>

                <div className='col s2' style={{borderRadius: 25, cursor: 'pointer'}} onClick={() => console.log('Yes')}>
                    <i className='material-icons'>comment</i>
                    <i className="material-icons"> { extended?  "arrow_drop_up" : "arrow_drop_down"} </i>
                </div>

               
                            
            </div>
            {extended? <DropDown data={props.data} /> : <div />}
        </li>
    )
}

const RejectedCampaigns = () => {

    const sampleData = {
        heading: 'Cat Power',
        description: lorem.generateParagraphs(1),
        rejectionReason: 'KYC unverified'

    }
    
    return (
        <div>
            <ul className='grey lighten-4'>
                <div className='card' style={{padding: '10px'}} >
                <RejectedCampaignItem data={sampleData}/>
                <RejectedCampaignItem data={sampleData}/>
                <RejectedCampaignItem data={sampleData}/>
                <RejectedCampaignItem data={sampleData}/>
                <RejectedCampaignItem data={sampleData}/>
                </div>
                
            </ul>
        </div>
    )
}

export default RejectedCampaigns