import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			startingPrice : 100,
			increment: 10,
			discounts : [],
			tax : 10 ,
			prices : []
		}
		this.onFieldChange = this.onFieldChange.bind(this);
		this.onClearDiscounts = this.onClearDiscounts.bind(this);
		this.onAddDiscount = this.onAddDiscount.bind(this);
	}
	
	onFieldChange(event) {
			
			this.state[event.target.name]= event.target.value;
			const prices = this.calculatePrices(this.state.startingPrice, this.state.increment, this.state.discounts);
			this.setState({
				[event.target.name]: event.target.value, prices:prices});
			
	}
	
	onClearDiscounts(event) {
		const discounts = [];
		const prices = this.calculatePrices(this.state.startingPrice, this.state.increment, discounts);
		this.setState( {discounts: discounts, prices:prices});		
	}
	
	onAddDiscount(event) {
		event.preventDefault();
		const discounts = this.state.discounts.concat([this.state.tempDiscount]);

		const prices = this.calculatePrices(this.state.startingPrice, this.state.increment, discounts);
		this.setState( {discounts: discounts, prices:prices, tempDiscount:''});
		
	}
	
	calculatePrices (startingPrice, increment, discounts) {
		const prices = [];
		for (var i=0; i< 10; i++) {
			let price = parseInt(startingPrice) + i * increment;
			let discountPrice = price;
			
			for (let discount of discounts ) {
				discountPrice = discountPrice * ((100 - discount) / 100);
			}
			prices.push({price:price, discountPrice: discountPrice});
		}
		return prices
		
		
	}
	
	render() { 
return (<div class="container-fluid">
 <div class="row">
	  <div class="col-sm">
      <label htmlFor="startingPrice">Staring Price</label>
    </div>
	  <div class="col-sm">
		<input type="text" name='startingPrice' value={this.state.startingPrice} onChange={this.onFieldChange}/>
    </div>
 </div>
	  
 <div class="row">
	 <div class="col-sm">
      increment
    </div>
	  <div class="col-sm">
      <input type="text" name='increment' value={this.state.increment} onChange={this.onFieldChange}/>
	  
    </div>
 </div>
		<div class="row">
	  <div class="col-sm">
		Discounts
		</div>
	  <div class="col-sm">
<input type="submit" value="Clear all discounts" onClick={this.onClearDiscounts}/>
		</div>
		
		
		</div>
		{this.state.discounts.map((discount) => <p>{discount}% off</p>)}
		
		
 <div class="row">
	 <div class="col-sm">
      Add Discount
    </div>
	  <div class="col-sm">
		<input type="text" name='tempDiscount'value={this.state.tempDiscount} onChange={this.onFieldChange}/>
      <input type="submit" name='addDiscount' value="+" onClick={this.onAddDiscount} />
	  
    </div>
 </div>
		
	
<table className="table">
  <thead>
    <tr>
      <th scope="col">Price</th>
      <th scope="col">DiscountedPrice</th>
    </tr>
  </thead>
		
		
		<tbody>{ this.state.prices.map((price) => <tr>
      <td>{price.price}</td><td>{price.discountPrice}</td></tr> )  }</tbody>
		
		</table>
		
		
		</div>

	
	);
	}
}

export default App;
