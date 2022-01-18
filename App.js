import React,{ Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';



class Form extends Component{


constructor(props){
	super(props)
	this.state = { selectedOption: ' ', wager: 0, account: '', player1: ''  }
	this.handleChange = this.handleChange.bind(this)
        this.onValueChange = this.onValueChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this)
}


	componentWillMount(){
		this.loadBlockchainData()
	}


	async loadBlockchainData(){

		console.log('just before the connect')
		const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-52-42-45-142.us-west-2.compute.amazonaws.com:8545"))

		this.setState({ web3 : web3 })
		const accounts = await web3.eth.getAccounts()
		console.log("account", accounts[0])
		console.log("account1", accounts[1])
		this.setState({ account: accounts[0] })

		const owner = accounts[0]
		const player1 = accounts[1]
		//this.setState({ player1: accounts[1] })
		this.setState({ player1 })
		var config  = require('./Gaming.json');   // put a copy in /src directory.....
		// then reference as ....    -> config.abi 
		const contract = new web3.eth.Contract(config.abi);
		this.setState({ contract }) 
		this.setState({ data: contract })
		this.setState({ contract: contract })

		// deployed via the web3 console interface...
		// more

		contract.options.address = "0x27A4A99b5Eabd0900ad158cD067df0A406a4ff08";
		contract.options.address = "0x2C50017Aaf3C53a93F34D0BCc18d9843F7dEAe9B";
		contract.methods.fundGame().send({from: owner, value: web3.utils.toWei('10', 'ether')}).then((f) => console.log(f))	


    		const initialBalance = await web3.eth.getBalance(player1)
		alert("initialBalance     " + String(initialBalance));
		console.log("initialBalance",initialBalance)
		const initialBalanceInEther = Number(web3.utils.fromWei(initialBalance, 'ether'))
		alert("initialBalanceInEther   " + String(initialBalanceInEther));
		console.log("initialBalanceInEther",initialBalanceInEther)

		//   two parameters this time: ( will mystery number be higher or lower than your given umber are higher(true) or lower(false)    )
		console.log("just before first call..., passing in a '12' as the player number with bet to be higher.")


		// true:  mystery number > player
		// false: mystery number < player

        	// FIX !   I need to put in a second to get this to run! a 'call' will only perform a read and not update the blockchain
	 	// put in the user account address  ------ the short one , not the private key!!!!
    		//let gameRound =   await contract.methods.winOrLose(10, false).send({from: player1 }).then((f) => console.log(f))
   		//let gameRound =   await contract.methods.winOrLose(10, false).send({from: '0x0Afa9B26194b8f0752b9005D28Da8B55fFED69BE' }).then((f) => console.log(f))
  		// works.....let gameRound =   await contract.methods.winOrLose(10, false, web3.utils.toWei('10', 'ether')).send({from: player1 ,value: web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))
  		let gameRound =   await contract.methods.winOrLose(10, true).send({from: player1 ,value: web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))
		gameRound =   await contract.methods.winOrLose(10, false).call(console.log)
		//let gameRound =   await contract.methods.winOrLose(10, false).send({from: player1 }).then((f) => console.log(f))
		gameRound =   await contract.methods.winOrLose(10, false).call(console.log)


		//0x7ee0a017020194d3ca679c2f8c2dc3cf9459e333e5a370ad79b6f33d6ccc8834

		console.log("just after the first call to winOrLose")


    		alert("gameRound A       ",gameRound   )

}




// Form submitting logic, prevent default page refresh
async handleSubmit(event){
	const { selectedOption, wager } = this.state
	event.preventDefault()
	console.log(this.state.selectedOption)
	alert("this.state.selectedOption")
	alert( this.state.selectedOption)
	let  HigherThanMysteryNumber = "true"
	if (this.state.selectedOption == "High") {
		HigherThanMysteryNumber = true
	}
	else{
		HigherThanMysteryNumber = false
	}
 	alert("HigherThanMysteryNumber")
 	alert(HigherThanMysteryNumber)
	if (HigherThanMysteryNumber) { 
		alert ("yessss")
	}
	console.log("HigherThanMysteryNumber",HigherThanMysteryNumber)
	console.log("this.state.wager",this.state.wager)	
	// 
	//this.state.contract. <method> !!!!!
	// do I need await for this method? 
	this.state.contract.methods.winOrLose(10, HigherThanMysteryNumber).send({from: this.state.player1 ,value: this.state.web3.utils.toWei(this.state.wager, 'ether')}).then((f) => console.log(f))
	//this.state.contract.methods.winOrLose(10, false).send({from: this.state.player1 ,value: this.state.web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))
	//this.state.contract.methods.winOrLose(10, HigherThanMysteryNumber).send({from: this.state.player1 ,value: this.state.web3.utils.toWei('1', 'ether')}).then((f) => console.log(f))

	console.log("player1, account1", this.state.player1)



    	const initialBalance = await this.state.web3.eth.getBalance(this.state.player1)
	alert("initialBalance     " + String(initialBalance));
	alert(initialBalance)
	console.log("initialBalance",initialBalance)
	const currentBalanceInEther = Number(this.state.web3.utils.fromWei(initialBalance, 'ether'))
	alert("currentBalanceInEther   " + String(currentBalanceInEther));
	console.log("currentBalanceInEther",currentBalanceInEther)




}

// Method causes to store all the values of the
// input field in react state single method handle
// input changes of all the input field using ES6
// javascript feature computed property names
handleChange(event){
    this.setState({
      wager: event.target.value
    });
}

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }
// Return a controlled form i.e. values of the
// input field not stored in DOM values are exist
// in react component itself as state
render(){
	return(
	<form onSubmit={this.handleSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="High"
              checked={this.state.selectedOption === "High"}
              onChange={this.onValueChange}
            />
            Mystery number is higher
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Low"
              checked={this.state.selectedOption === "Low"}
              onChange={this.onValueChange}
            />
            Mystery Number is lower
          </label>
        </div>      
 <div>
          Selected option is : {this.state.selectedOption}
        </div>
		<div>
		<label htmlFor='wager'>wager</label>
		<input
			name='wager'
			placeholder='0'
			value = {this.state.wager}
			onChange={this.handleChange}
		/>
		</div>
				<div>
		<button>Create Account</button>
		</div>
	</form>
	)
}
}

export default Form

