import React from 'react';

import AddVeggieForm from './AddVeggieForm';

import base from '../base'

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

   componentDidMount() {
     base.onAuth((user) => {
       if(user) {
         this.authHandler(null, { user }); // so we don't need to reauthenticate on every page reload
       }
     });
   }

  handleChange(e, k) {
    const veggie = this.props.veggies[k];
    const updatedVeggie = {
      ...veggie,
      [e.target.name]: e.target.value // lesson 20 - 9:40
    }
    this.props.updateVeggie(k, updatedVeggie)
  }

  authenticate(provider) { // lesson 24 - 12:30
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData) {
    if(err) {
      console.log(err);
      return;
    }

    // grab store info from firebase
    const storeRef = base.database().ref(this.props.storeId);

    // query once for store database
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no woner already
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    });

  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with Github</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log in with Twitter</button>
      </nav>
    );
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
    const logout = <button onClick={this.logout}>Log Out</button>

    // check if logged in
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // check if current owner of the store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you're not the owner of this store</p>
          {logout}
        </div>
      );
    }

    const { veggies } = this.props;
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
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
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
};

export default Inventory;
