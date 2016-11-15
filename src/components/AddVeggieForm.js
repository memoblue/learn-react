import React from 'react';

class AddVeggieForm extends React.Component {
  createVeggie(e) {
    e.preventDefault();
    const veggie = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }
    this.props.addVeggie(veggie); // passed down from App > Inventory
    this.addVeggieForm.reset();
  }

  render() {
    return (
      <form ref={(form) => this.addVeggieForm = form} className="veggie-edit" onSubmit={(e) => this.createVeggie(e)}>
        <input ref={(i) => this.name = i} type="text" placeholder="Veggie Name" />
        <input ref={(i) => this.price = i} type="text" placeholder="Veggie Price" />
        <select ref={(i) => this.status = i}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(i) => this.desc = i} placeholder="Veggie Desc"></textarea>
        <input ref={(i) => this.image = i} type="text" placeholder="Veggie Image" />
        <button type="submit">+ Add Item</button>
      </form>
    );
  }
}

export default AddVeggieForm;
