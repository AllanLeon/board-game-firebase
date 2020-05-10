import React from 'react';

export class History extends React.Component {

  render() {
    const moves = this.props.history.map((_step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.props.onClick(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <ol>{moves}</ol>
    );
  }
}