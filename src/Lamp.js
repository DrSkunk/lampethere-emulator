import React from "react";
import mqtt from "mqtt";
import styled from "styled-components";

const version = "1.0.0";

const Root = styled.div`
  border: 1px solid black;
  width: 500px;
`;

const Color = styled.span`
  display: inline-block;
  width: 100px;
  height: 20px;
  ${({ color }) => `background-color: ${color};`}
  border: 1px solid #ccc;
`;

const Connected = styled.div`
  ${({ connected }) => `color: ${connected ? "green" : "red"};`}
`;

class Lamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: this.props.deviceId,
      color: "#ffffff",
      receivedColor: "#ffffff",
      connected: false,
      groups: [],
      name: "unset",
    };
  }

  toggleConnect = () => {
    if (this.state.connected) {
      console.log("Disconnecting...");
      if (this.client) {
        this.client.end();
        this.setState({
          connected: false,
        });
      }
    } else {
      console.log("Connecting...");

      const { groupId, deviceId } = this.state;
      const { server, port, username, password } = this.props.serverConfig;
      const client = mqtt.connect(`ws://${server}:${port}`, {
        username,
        password,
        will: {
          topic: `/lampethere/device/${deviceId}/online`,
          payload: "false",
        },
      });

      client.on("connect", () => {
        console.log("Connected");

        this.setState({ connected: true });

        client.subscribe(`/lampethere/device/${deviceId}/#`, (err) => {
          if (!err) {
            client.publish(`/lampethere/device/${deviceId}/online`, "true", {
              retain: true,
            });
            client.publish(`/lampethere/device/${deviceId}/version`, version);
          } else {
            console.error(err);
          }
        });
      });

      client.on("error", (error) => {
        this.setState({ connected: false });
        console.error(error);
        client.end();
      });

      client.on("message", (topic, message) => {
        console.log(deviceId, topic, message.toString());
        // eslint-disable-next-line default-case
        switch (topic) {
          case `/lampethere/device/${deviceId}/message`:
            this.setState({
              receivedColor: JSON.parse(message.toString()).color,
            });
            break;
          case `/lampethere/device/${deviceId}/config/color/set`:
            this.setState({
              color: message.toString(),
            });
            break;
          case `/lampethere/device/${deviceId}/config/name/set`:
            this.setState({
              name: message.toString(),
            });
            break;
          case `/lampethere/device/${deviceId}/config/groups/set`:
            const groups = JSON.parse(message.toString());
            this.setState({
              groups,
            });
            groups.forEach((group) => {
              this.client.subscribe(
                `/lampethere/group/${group}/message`,
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            });
            break;
        }

        if (topic.endsWith("/message")) {
          this.setState({
            receivedColor: JSON.parse(message.toString()).color,
          });
        }
      });
      this.client = client;
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  pushThzeButton = () => {
    const { color } = this.state;
    this.state.groups.forEach((groupId) => {
      console.log("group", groupId, color);
      this.client.publish(
        `/lampethere/group/${groupId}/message`,
        JSON.stringify({ color })
      );
    });
  };

  render() {
    const {
      receivedColor,
      deviceId,
      color,
      groups,
      name,
      connected,
    } = this.state;
    return (
      <Root>
        <Connected connected={connected}>
          Connected:{connected.toString()}
        </Connected>
        <div>
          <label htmlFor="deviceId">Device ID:</label>
          <input
            type="text"
            value={deviceId}
            onChange={this.onChange}
            name="deviceId"
            id="deviceId"
          />
        </div>
        <div>
          Color:
          <Color color={color} />
        </div>
        <div>name: {name}</div>
        <div>groups: {JSON.stringify(groups)}</div>
        <div>
          Received color:
          <Color color={receivedColor} />
        </div>
        <button onClick={this.toggleConnect}>
          {connected ? "Disconnect" : "Connect"}
        </button>
        <button onClick={this.pushThzeButton} disabled={!connected}>
          Push thze button
        </button>
      </Root>
    );
  }
}

export default Lamp;
