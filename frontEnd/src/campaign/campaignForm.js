import React, { useState, useCallback, useEffect } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import Header from "../navbar/header";
import { useNavigate, Navigate } from "react-router";



const CampaignForm = () => {

	

	const { user } = useMoralis();

	const [sponsorName,  updateSponsorName] = useState('')
	const [sponsorEmail, updateSponsorEmail] = useState('')
	const [startDate,    updateStartDate] = useState('')
	const [endDate,      updateEndDate] = useState('')
	const [imgUrl,       updateImgUrl] = useState('')
	const [heading,      updateHeading] = useState('')
	const [description,  updateDescription] = useState('')
	const [amount,       updateAmount] = useState('')
	const [currency,     updateCurrency] = useState('')
	const [uploadedSucess, updateUploadSucess] = useState(false)

	const navigate = useNavigate()

	const {
	  error,
	  isUploading,
	  moralisFile,
	  saveFile,
	} = useMoralisFile();


	const saveToIPFS = async () => {

		const campaignNFTData = {
			name: heading,
			description: description,
			image: imgUrl,
			properties: {
				sponsorName,
				sponsorEmail,
				startDate,
				endDate,
				amount,
				currency
			}
		}

		
		const file = {base64 : btoa(JSON.stringify(campaignNFTData))};
		const savedFile = await saveFile('firstData.json', file, { saveIPFS: true})
		const ipfsData = savedFile.toJSON()

		updateSponsorName('')
		updateSponsorEmail('')
		updateStartDate('')
		updateEndDate('')
		updateImgUrl('')
		updateHeading('')
		updateDescription('')
		updateAmount('')
		updateCurrency('')

		updateUploadSucess(true)

		console.log(ipfsData)
	}

	
	
	useEffect(() => {
		// if (uploadedSucess){
		// 	navigate('/')
		// }
	})
	

	return (
		<div>
			<Header />
			<div className="container">
				{
					uploadedSucess? (
						<div className="card center green accent-4" style={{padding: 10, borderRadius: 40}}  >
							
							<h4>
								<a onClick={() => updateUploadSucess(false)} className="btn-floating waves-effect waves-light red accent-4"><i class="material-icons">clear</i></a> 
								Your Campaign Has been uploaded sucessfully</h4>
						</div>		
					) : <div />
				}

				<div className="card center whitesmoke" style={{paddingTop: '3%', paddingBottom: '3%', borderRadius: 40, border: '3px solid #1a237e'}}>
					<h3>Create a Campaign </h3>
					<div className="row" style={{padding: 20, paddingLeft: 60, paddingRight: 60}}>

						<div className="input-field col s6">
							<label for='sponsorName'>Sponsor Legal Name</label>
							<input id='sponsorName' className='grey lighten-4' type="text" value={sponsorName} onChange={e => updateSponsorName(e.target.value)} />
						</div>

						<div className="input-field col s6">
							<label for='sponsorEmail'>Sponsor Email</label>
							<input id='sponsorEmail' className='grey lighten-4' type="text" value={sponsorEmail} onChange={e => updateSponsorEmail(e.target.value)} />
						</div>
						

						<div className="input-field col s12">
							<label for='heading'>Campaign Heading</label>
							<input id='heading' className='grey lighten-4' type="text" value={heading} onChange={e => updateHeading(e.target.value)} />
						</div>

						<div className="input-field col s12">
							<textarea id="description" value={description} onChange={e => updateDescription(e.target.value)} className="materialize-textarea grey lighten-4"></textarea>
							<label for="description">Description</label>
						</div>
						
					
						<div className="input-field col s6">
							<input id="startDate" className='grey lighten-4' value={startDate} onChange={e => updateStartDate(e.target.value)} type="date" ></input>
							<label for="startDate" >Start Date</label>
						</div>
						<div className="input-field col s6">
							<input id="endDate" className='grey lighten-4' value={endDate} onChange={e => updateEndDate(e.target.value)} type="date" ></input>
							<label for="endDate">End Date</label>
						</div>

						<div className="input-field col s6">
							<input id="amount" className='grey lighten-4' value={amount} onChange={e => updateAmount(e.target.value)} type="number" ></input>
							<label for="amount">Goal Amount</label>
						</div>

						
						<div className="input-field col s6">
							<select id='currency'  className='browser-default grey lighten-4' onChange={e => updateCurrency(e.target.value)} value={currency} >
								<option value="" disabled>Select Currency</option>
								<option value="stable">Stable Coin</option>
								<option value="matic">Matic</option>
								<option value="eth">Ethereum</option>
							</select>
						</div>


						<div className="input-field col s12">
							<label for='imgUrl'>Campaign Image URL</label>
							<input id='imgUrl' className='grey lighten-4' type="text" value={imgUrl} onChange={e => updateImgUrl(e.target.value)} />
						</div>
						
					</div>
					<div className="center">
						<h4>Account Detail: {user.attributes.ethAddress} </h4>
					</div>

					<div className='center' style={{paddingTop: 10}}>
						<a onClick={() => saveToIPFS() }
						className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Submit</a>

					</div>
					
						
						
				</div>
			</div>
		</div>
	)
}

export default CampaignForm