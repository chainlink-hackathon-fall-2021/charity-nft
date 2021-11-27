import Header from "../navbar/header";
import dai from '../resources/images/dai.png'
import usdc from '../resources/images/usdc.png'


const Portfolio = (props) => {
    return(
    <div className='card row' style={{borderRadius: 25, border: '3px solid black'}}>
        <div className='col s2'>
            <div className='row'>
                <span className='col s12 center' style={{fontSize: '20px' , padding: '10px'}}>Savings Balance</span>
                <span className='col s12 center'>$5000</span>
                
            </div>
        </div>

        <div className='col s2'>
            <div className='row'>
                <span className='col s12 center' style={{fontSize: '20px' , padding: '10px'}}>Share</span>
                <span className='col s12 center'>5 %</span>
                
            </div>
        </div>

        <div className='col s2'>
            <div className='row'>
                <span className='col s12 center' style={{fontSize: '20px' , padding: '10px'}}>Interest Accrued</span>
                <span className='col s12 center'>$750</span>
                
            </div>
        </div>

        <div className='col s2'>
            <div className='row'>
                <span className='col s12 center' style={{fontSize: '20px' , padding: '10px'}}>Donations</span>
                <span className='col s12 center'>$5000</span>
                
            </div>
        </div>

        <div className='col s2'>
            <div className='row'>
                <span className='col s12 center' style={{fontSize: '20px' , padding: '10px'}}>Total Donated</span>
                <span className='col s12 center'>$75</span>
                
            </div>
        </div>

        <div className='col s2'>
            <div className='row'>
                <span className='col s12 center' style={{fontSize: '20px' , padding: '10px'}}>Net Earning</span>
                <span className='col s12 center'>$675</span>
                
            </div>
        </div>

    </div>
    )


}

const Pools = (props) => {
    return (

        <div className='card' style={{padding: '2%',borderRadius: 25, border:'3px solid black'}} >
            <div className='row' style={{borderBottom: '3px solid black'}}>

                <div className='col s1'>
                    <img src={dai} height='100px' width='100px' />
                </div>
                
                <span className='center  col s2' style={{height: '50%' , fontSize: '70px'}} >DAI</span>

                <span className='col s5 center'  style={{height: '50%' , fontSize: '70px'}} >$100000</span>
                
                <a className="waves-effect green darken-1 btn-large col s2" style={{marginTop: '2.25%'}}>Invest</a>
                <a className="waves-effect red darken-3 btn-large col s2" style={{marginTop: '2.25%'}}>Remove</a>

            </div>

            {/* USDC */}
            <div className='row'>

                <div className='col s1'>
                    <img src={usdc} height='100px' width='100px'  />
                </div>
                
                <span className='center  col s3 ' style={{height: '50%' , fontSize: '70px'}} >USDC</span>

                <span className='col s4 center '  style={{height: '50%' , fontSize: '60px'}} >Coming Soon</span>
                
                <a className="waves-effect grey darken-1 btn-large col s2 disabled" style={{marginTop: '2.25%' , borderRight: '1px solid black'}}>Invest</a>
                <a className="waves-effect red darken-3 btn-large col s2 disabled" style={{marginTop: '2.25%'}}>Remove</a>

            </div>


        
        </div>

    )
}

const Tokens = (props) => {
    return (
        <div className='row center'>

            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 1</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 2</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 3</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 4</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 5</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 6</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 7</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 8</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 9</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 10</div>
            <div className='col s2 red' style={{height: '100px', width: '100px', border: '1px solid black'}}> 11</div>
            

        </div>
    )
}


const InvestmentProfile = () => {
    return (

        <div>
            <Header />
            <h3 className='center'>Investment Profile</h3>
            <div className='container'>

                <Portfolio />
                
                <h3 className='center'>Available Pools</h3>
                <Pools />
                

                <h3 className='center'>Proof of Donation Tokens</h3>
                <div className='center'>
                    <Tokens />
                </div>
            
            </div>
        </div>
    )
}


export default InvestmentProfile