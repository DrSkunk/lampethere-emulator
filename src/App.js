import React from "react";
import Lamp from "./Lamp";

class App extends React.Component {
  state = {
    numberOfLamps: 3,
    server: "localhost",
    port: 9001,
    username: "lampethere",
    password: "lampethere",
  };

  addLamp = () => {
    this.setState(({ numberOfLamps }) => ({
      numberOfLamps: numberOfLamps + 1,
    }));
  };

  removeLamp = () => {
    this.setState(({ numberOfLamps }) => ({
      numberOfLamps: Math.max(numberOfLamps - 1, 0),
    }));
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const lamps = [];
    const serverConfig = {
      server: this.state.server,
      port: this.state.port,
      username: this.state.username,
      password: this.state.password,
    };
    for (let i = 0; i < this.state.numberOfLamps; i++) {
      console.log(i);
      lamps.push(
        <Lamp key={i} deviceId={`device${i + 1}`} serverConfig={serverConfig} />
      );
    }
    console.log("lamps", lamps);

    return (
      <>
        <div>
          Server:
          <input
            type="text"
            name="server"
            onChange={this.onInputChange}
            value={this.state.server}
          />
        </div>
        <div>
          Port:
          <input
            type="number"
            name="port"
            onChange={this.onInputChange}
            value={this.state.port}
          />
        </div>
        <div>
          Username:
          <input
            type="text"
            name="username"
            onChange={this.onInputChange}
            value={this.state.username}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            name="password"
            onChange={this.onInputChange}
            value={this.state.password}
          />
        </div>
        <button onClick={this.addLamp}>Add lamp</button>
        <button onClick={this.removeLamp}>Remove lamp</button>
        {lamps}
      </>
    );
  }
}

export default App;
