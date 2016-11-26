import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group'

class Order extends React.Component {

  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(k) {
    const veggie = this.props.veggies[k];
    const count  = this.props.order[k];
    const removeButton = <button onClick={() => this.props.removeFromOrder(k)}>&times;</button>;

    if(!veggie || veggie.status === 'unavailable') {
      return <li key={k}>Sorry, {veggie ? veggie.name : 'veggie'} is no longer available {removeButton}</li>;
    }

    return (
      <li key={k}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}{/* adding the key is what trigger the magic element duplication */}</span>
          </CSSTransitionGroup>

          lbs {veggie.name} {removeButton}</span>
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
        <CSSTransitionGroup
           className="order"
           component="ul"
           transitionName="order"
           transitionEnterTimeout={500}
           transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}

Order.propTypes = {
  veggies: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
};

export default Order;
