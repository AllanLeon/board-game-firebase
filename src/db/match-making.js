import 'firebase/firestore';
import { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from './firebase-init';

export function useMatchMaking(roomName) {
  const firebase = useContext(FirebaseContext);
  const matchesCollectionRef = firebase.firestore().collection('matches');
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  
  useEffect(() => {
    function handleRoomAvailabilityCheck(status) {
      setHasJoinedRoom(status);
    }
    if (roomName) {
      matchesCollectionRef.where('roomName', '==', roomName)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            // increase counter,
            const docId = querySnapshot.docs[0].id;
            const numberOfPlayers = querySnapshot.docs[0].data().numberOfPlayers || 0;
            return matchesCollectionRef.doc(docId).update({
              numberOfPlayers: numberOfPlayers + 1,
            });
          }
          // create room
          return matchesCollectionRef.add({
            roomName,
          });
        })
        .then((doc) => {
          console.log('Joined room:', doc);
          handleRoomAvailabilityCheck(true);
        })
        .catch((error) => {
          console.error(`Error joining room: ${roomName}`, error);
          handleRoomAvailabilityCheck(false);
        });
    }
    return (() => {
      // unsubscribe/reduce room number of users
    });
  });

  return hasJoinedRoom;
}
