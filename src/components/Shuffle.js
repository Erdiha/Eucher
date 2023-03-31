import { useState, useEffect } from 'react';

export const useShuffle = (array, socket) => {
  const [shuffledArray, setShuffledArray] = useState(array);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    if (shuffle) {
      const shuffled = shuffleDeck(array);
      socket.emit('shuffled', shuffled);
      setShuffledArray(shuffled);
    }
    setShuffle(false);
  }, [shuffle]);

  return [shuffledArray, setShuffle];
};
