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
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.addVeggie = this.addVeggie.bind(this);
    this.updateVeggie = this.updateVeggie.bind(this);
    this.removeVeggie = this.removeVeggie.bind(this);
    this.state = {
      veggies: {},
      order: {}
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/veggies`, // storeId available via router
      {
        context: this,
        state: 'veggies'
      });

      // check for orders in localStorage
      const localStorageRef =  localStorage.getItem(`order-${this.props.params.storeId}`);
      if (localStorageRef) {
        this.setState({
          order: JSON.parse(localStorageRef)
        })
      }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

  removeFromOrder(k) {
    const order = {...this.state.order};
    delete order[k]; // we don't use firebase for orders so we don't have to use the `obj[k] = null` syntax
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

  updateVeggie(k, updatedVeggie) {
    const veggies = {...this.state.veggies}; // first copy state
    veggies[k] = updatedVeggie; // then override the key (specific veggie) we need
    this.setState({ veggies });
  }

  removeVeggie(k) {
    const veggies = {...this.state.veggies};
    veggies[k] = null; // delete veggies[key]; <== can't use because doesn't work with firebase
    this.setState({ veggies });
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
        <Order
          order={this.state.order}
          veggies={this.state.veggies}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          veggies={this.state.veggies}
          loadSamples={this.loadSamples}
          addVeggie={this.addVeggie}
          updateVeggie={this.updateVeggie}
          removeVeggie={this.removeVeggie}
          storeId={this.props.params.storeId}
        />
      </div>
    );
  }
}

App.proptypes = {
  params: React.PropTypes.object.irRequied
}

export default App;
