import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {

  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(k) {
    const veggie = this.props.veggies[k];
    const count  = this.props.order[k];

    if(!veggie || veggie.status === 'unavailable') {
      return <li key={k}>Sorry, {veggie ? veggie.name : 'veggie'} is no longer available</li>;
    }

    return (
      <li key={k}>
        <span>{count}lbs {veggie.name}</span>
        <span className="price">{formatPrice(count * veggie.price)}</span>
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, k) => {
      const veggie = this.props.veggies[k];
      const count = this.props.order[k];
      const isAvailable = veggie && veggie.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * veggie.price || 0); // || 0 in case fish is being deleted
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;
