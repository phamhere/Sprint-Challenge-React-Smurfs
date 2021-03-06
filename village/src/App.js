import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import SingleSmurf from "./components/SingleSmurf";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      smurfId: "",
      isEditing: false,
      smurf: {}
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }
  addSmurftoSmurfs = smurfs => {
    this.setState({ smurfs: smurfs });
  };
  toggleUpdate = smurf => {
    this.setState({ isEditing: true, smurfId: smurf.id, smurf: smurf });
  };
  falseUpdate = () => {
    this.setState({ isEditing: false, smurf: {} });
  };
  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="App">
        <NavBar isEditing={this.state.isEditing} />
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm
              {...props}
              addSmurftoSmurfs={this.addSmurftoSmurfs}
              isEditing={this.state.isEditing}
              smurfId={this.state.smurfId}
              smurf={this.state.smurf}
              falseUpdate={this.falseUpdate}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
              toggleUpdate={this.toggleUpdate}
            />
          )}
        />
        <Route
          path="/smurf/:id"
          render={props => (
            <SingleSmurf
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
              toggleUpdate={this.toggleUpdate}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
