import React from 'react';

import { Game } from './components';
import { RoomStatus } from './components/RoomStatus';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      finalRoomName: '',
    };
  }

  handleRoomNameChange = (event) => {
    this.setState({ roomName: event.target.value });
  }

  handleRoomNameSubmit = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    const { roomName } = this.state;
    this.setState({
      roomName,
      finalRoomName: roomName,
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.roomName}
          onChange={this.handleRoomNameChange}
          onKeyUp={this.handleRoomNameSubmit}
        />
        <RoomStatus roomName={this.state.finalRoomName}></RoomStatus>
        <Game />
      </div>
    );
  }
}
