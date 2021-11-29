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
        <div className='row'  style={{border: '2px solid #5e62d4', borderTop: '0px'}}>

            <img className='left' 
                width='400px'
                height='250px'
                style={{ padding: '30px'}}
                src='https://assets.rappler.co/612F469A6EA84F6BAE882D2B94A4B421/img/0192FDD410A74678914FC59525EB602B/campaign-explainer.jpg' 
            />


            <span className='col s12' style={{textAlign: 'left'}} >{description}</span>
            
            <span className='col s12' style={{textAlign: 'left', paddingTop: '10px'}} >KYC Information</span>

        </div>
    )
}


const RunningCampaignItem = (props) => {

    const [extended, setExtended] = useState(false)

    const {heading, timeleft, votesRatio} = props.data

    return (
        <li>
            <div className='row' style={{padding: '10px', borderBottom: '1px solid #5e62d4'}}>
                <div onClick={() => setExtended(!extended)} style={{cursor: 'pointer'}}>
                    <div className='col s4 '>
                        <span style={{float: 'left', fontSize: extended? '30px': '' }} >{heading}</span>
                    </div>

                    <div className='col s2 '>
                        <span style={{float: 'right'}} >{timeleft} hr</span>
                    </div>

                    <div className='col s2 '>
                        <span style={{float: 'right', color: votesRatio >= 50? 'green':'red' }} >Vote Ratio(yes/no): {votesRatio}</span>
                    </div>
                </div>

                <div className='col s2 green' style={{borderRadius: 5, cursor: 'pointer'}} onClick={() => console.log('Yes')}>
                    <span style={{color: 'white'}}>Yes</span>                    				
                </div>

                <div className='col s2 red' style={{borderRadius: 5, cursor: 'pointer'}} onClick={() => console.log('Reject')}>
                    <span style={{color: 'white'}}>No</span>                    				
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