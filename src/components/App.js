import React from 'react';

import base from '../base';
import sampleVeggies from '../sample-veggies'

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Veggie from './Veggie';

class App extends React.Component {
  constructor() {
    super();
    this.loadSamples = this.loadSamples.bind(this);
    this.addVeggie = this.addVeggie.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.state = {
      veggies: {},
      order: {}
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/veggies`,
      {
        context: this,
        state: 'veggies'
      });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSamples() {
    this.setState({
      veggies: sampleVeggies
    });
  }

  addToOrder(key) {
    // copy state
    const order = {...this.state.order};
    // update or add new veggie count
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });
  }

  addVeggie(veggie) {
    // copy state
    const veggies = {...this.state.veggies};
    // add new veggie
    const timestamp = Date.now();
    veggies[`veggie-${timestamp}`] = veggie;
    // set state
    this.setState({ veggies }); // = veggies: veggies
  }

  render() {
    const veggiesList = this.state.veggies;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Locally sourced & organic" />
          <ul className="list-of-veggies">
            {
              Object
                .keys(veggiesList)
                .map(k => <Veggie key={k} idx={k} details={veggiesList[k]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order order={this.state.order} veggies={this.state.veggies} />
        <Inventory loadSamples={this.loadSamples} addVeggie={this.addVeggie} />
      </div>
    );
  }
}

export default App;
