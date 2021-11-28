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

    const {description, donors, raised} = props.data

    return (
        <div className='row'  style={{border: '2px solid #5e62d4', borderTop: '0px'}}>

            <div className='col s6'><span style={{fontWeight: 'bold', paddingBottom: '2px'}} >Total Donors: {donors}</span></div>
            <div className='col s6' style={{fontWeight: 'bold', paddingBottom: '2px'}}><span>Total raised: ${raised}</span></div>
                    

            <span className='col s12' style={{textAlign: 'left'}} >{description}</span>
            
            <span className='col s12' style={{textAlign: 'left', paddingTop: '10px'}} >KYC Information</span>

        </div>
    )
}


const CompletedCampaignItem = (props) => {

    const [extended, setExtended] = useState(false)

    const {heading, raised} = props.data

    return (
        <li onClick={() => setExtended(!extended)}>
            <div className='row' style={{padding: '10px', borderBottom: '1px solid #5e62d4'}}>
                
                <div className='col s6 '>
                    
                    <span style={{float: 'left', fontSize: extended? '30px': '' }} >{heading}</span>
                    
                </div>

                <div className='col s4 '>
                    {extended? <div className='col s4' />:
                        <span style={{float: 'right'}} >Total raised: ${raised}</span>
                    }
                </div>

                <div className='col s2' style={{borderRadius: 25, cursor: 'pointer'}} onClick={() => console.log('Yes')}>
                    <i class="material-icons"> { extended?  "arrow_drop_up" : "arrow_drop_down"} </i>
                </div>

               
                            
            </div>
            {extended? <DropDown description={props.description} data={props.data} /> : <div />}
        </li>
    )
}

const CompletedCampaigns = () => {

    const sampleData = {
        heading: 'Cat Power',
        description: lorem.generateParagraphs(1),
        donors: 42,
        raised: 100000

    }
    
    return (
        <div>
            <ul className='grey lighten-4'>
                <div className='card' style={{padding: '10px'}} >

                <CompletedCampaignItem data={sampleData}/>
                <CompletedCampaignItem data={sampleData}/>
                <CompletedCampaignItem data={sampleData}/>
                <CompletedCampaignItem data={sampleData}/>
                <CompletedCampaignItem data={sampleData}/>
                </div>
                
            </ul>
        </div>
    )
}

export default CompletedCampaigns