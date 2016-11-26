import React from 'react';

import AddVeggieForm from './AddVeggieForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, k) {
    const veggie = this.props.veggies[k];
    const updatedVeggie = {
      ...veggie,
      [e.target.name]: e.target.value // lesson 20 - 9:40
    }
    this.props.updateVeggie(k, updatedVeggie)
  }

  renderInventory(k) {
    const veggie = this.props.veggies[k];
    return(
      <div className="veggie-edit" key={k}>
        <input name="name" value={veggie.name} type="text" placeholder="Veggie Name" onChange={(e) => this.handleChange(e, k)} />
        <input name="price" value={veggie.price} type="text" placeholder="Veggie Price" onChange={(e) => this.handleChange(e, k)} />
        <select name="status" value={veggie.status} onChange={(e) => this.handleChange(e, k)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={veggie.desc} placeholder="Veggie Desc" onChange={(e) => this.handleChange(e, k)}></textarea>
        <input name="image" value={veggie.image} type="text" placeholder="Veggie Image" onChange={(e) => this.handleChange(e, k)} />
        <button onClick={() => this.props.removeVeggie(k)}>Remove Veggie</button>
      </div>
    )
  }

  render() {
    const { veggies } = this.props;
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(veggies).map(this.renderInventory)}
        <AddVeggieForm addVeggie={this.props.addVeggie}/>
        <button onClick={this.props.loadSamples}>Load sample veggies</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  veggies: React.PropTypes.object.isRequired,
  removeVeggie: React.PropTypes.func.isRequired,
  updateVeggie: React.PropTypes.func.isRequired,
  addVeggie: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
