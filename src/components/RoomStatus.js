import React from 'react';

import { useMatchMaking } from '../db/match-making';

export function RoomStatus(props) {
  const hasJoinedRoom = useMatchMaking(props.roomName);

  return (
    <div style={{ color: hasJoinedRoom ? 'green' : 'red' }}>
      &#9679;
    </div>
  )
}
