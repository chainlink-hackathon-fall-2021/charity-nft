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