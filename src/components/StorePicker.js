import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    // get text from input field
    const storeId = this.storeInput.value;
    // transition to store URL
    this.context.router.transitionTo(`/store/${storeId}`); //  !! will change to correct URL but WON'T LOAD COMPONENT without first forward slash
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please enter a store</h2>
        <input ref={(el) => { this.storeInput = el }} type="text" required placeholder="Store Name" defaultValue={getFunName()} />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
