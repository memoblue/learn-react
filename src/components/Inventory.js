import React from 'react';

import AddVeggieForm from './AddVeggieForm';

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddVeggieForm addVeggie={this.props.addVeggie}/>
        <button onClick={this.props.loadSamples}>Load sample veggies</button>
      </div>
    );
  }
}

export default Inventory;
