import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import data from '../data';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  /* GET DATA */

  useEffect(() => {
    let rooms = formatData(data);
    let featuredRooms = rooms.filter((room) => room.featured === true);

    setRooms(rooms);
    setSortedRooms(rooms);
    setFeaturedRooms(featuredRooms);
    setLoading(false);
  }, []);

  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = {
        ...item.fields,
        id,
        images,
      };

      return room;
    });

    return tempItems;
  };

  const getRoom = (slug) => {
    let tempRooms = [...rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  return (
    <RoomContext.Provider value={{ rooms, featuredRooms, sortedRooms, loading, getRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomsData = () => {
  const { rooms, featuredRooms, sortedRooms, loading, getRoom } = useContext(RoomContext);

  return { rooms, featuredRooms, sortedRooms, loading, getRoom };
};

export default RoomProvider;
