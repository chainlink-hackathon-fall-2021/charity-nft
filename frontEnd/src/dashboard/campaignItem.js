import React, { useState } from "react";
import shibaToken from '../resources/images/shiba.png'


const CampaignItem = (prop) => {
     
    console.log(prop)

    return (
        <li>
            <div className="row" style={{ borderBottom: '3px solid black' }}>
                <div className="col s2" style={{padding: 10}}>
                    <img className="responsive-img small" src={shibaToken} width='100px' height='100px' />
                </div>
                <div className="col s8">
                    <div className="row">
                        <p className="col s12" style={{margin: 0, fontSize: 30}} >{prop.heading}</p>
                        <p className="col s12" >{prop.description}</p>
                    </div>
                </div>

                <div className="col s2" style={{ borderLeftWidth: 3, borderColor: 'black' }} >
                    <div className="row">
                        <div className="col s12">
                            <p style={{fontSize: 20, margin: 0}} >Total Donated</p>
                            <p style={{fontSize: 30, margin: 0}}>100 DAI</p>
                            <p>Goal: 1000 DAI</p>
                            
                        </div>

                    </div>
                </div>
                
            </div>
        </li>
        
    )
}

export default CampaignItem