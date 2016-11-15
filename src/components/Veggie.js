import React from 'react';
import { formatPrice } from '../helpers';

class Veggie extends React.Component {
  render() {
    const { details, idx } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';
    return (
      <li className="menu-veggie">
        <img src={details.image} alt={details.name} />
        <h3 className="veggie-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={() => this.props.addToOrder(idx)} disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }
}

export default Veggie;
