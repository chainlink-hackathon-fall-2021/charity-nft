import React, { useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { useDispatch } from "react-redux";
import { formSubmit } from "../store/reducers/campaignFormReducer";
import Header from "../navbar/header";


const saveDataToIPFS = async (data) =>  {
	// const {
	//   error,
	//   isUploading,
	//   moralisFile,
	//   saveFile,
	// } = useMoralisFile();
  
	// const file = new moralisFile("file.json", {base64 : btoa(JSON.stringify(data))});
  
	// const campaignData = await saveFile(file.name, file, { saveIPFS: true });

	// console.log(campaignData)
	
	// return campaignData
	// const {
	// 	moralisFile,
	// 	saveFile,
	// } = useMoralisFile();

	// const file = { base64 : btoa(JSON.stringify({something: 'helloworld'}))}
	// const campaignData = await saveFile('test.json', file, { saveIPFS: true });


}

const CampaignForm = () => {

	const { user } = useMoralis();
	const [heading, updateHeading] = useState('')
	const [description, updateDescription] = useState('')
	const [amount, updateAmount] = useState('')
	const [currency, updateCurrency] = useState('')

	const data = {
		heading,
		description,
		amount,
		currency
	}

	
	const dispatch = useDispatch()

	return (
		<div>
			<Header />
			<div className="container">
				<div className="card center whitesmoke" style={{paddingTop: '3%', paddingBottom: '3%', borderRadius: 40, borderColor: '#1a237e', borderWidth: 10}}>
					<h3>Create a Campaign </h3>
					<div className="row" style={{padding: 20, paddingLeft: 60, paddingRight: 60}}>
					
						<div className="input-field col s12">
							<label for='heading'>Heading</label>
							<input id='heading' type="text" value={heading} onChange={e => updateHeading(e.target.value)} />
						</div>

						<div className="input-field col s12">
							<textarea id="description" value={description} onChange={e => updateDescription(e.target.value)} className="materialize-textarea"></textarea>
							<label for="description">Description</label>
						</div>
						
						<div className="input-field col s6">
							<input id="amount" value={amount} onChange={e => updateAmount(e.target.value)} type="number" ></input>
							<label for="amount">Goal Amount</label>
						</div>

						
						<div className="input-field col s6">
							<select id='currency' className='browser-default' onChange={e => updateCurrency(e.target.value)} value={currency} >
								<option value="" disabled>Select Currency</option>
								<option value="stable">Stable Coin</option>
								<option value="matic">Matic</option>
								<option value="eth">Ethereum</option>
							</select>
						</div>			

					</div>
					<div className="center">
						<h4>Account Detail: {user.attributes.ethAddress} </h4>
					</div>

					<div className='center' style={{paddingTop: 10}}>
						<a onClick={() => dispatch(formSubmit(data))}
						className="waves-effect waves-light btn"><i class="material-icons left">cloud</i>Submit</a>

					</div>
					
						
						
				</div>
			</div>
		</div>
	)
}

export default CampaignForm