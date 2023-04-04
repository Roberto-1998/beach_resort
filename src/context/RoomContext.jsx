import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import data from '../data';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formValues, setFormValues] = useState({
    type: 'all',
    capacity: 0,
    price: 0,
    maxPrice: 0,
    minPrice: 0,
    maxSize: 0,
    minSize: 0,
    breakfast: false,
    pets: false,
  });

  /* GET DATA */

  useEffect(() => {
    let rooms = formatData(data);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    setRooms(rooms);
    setSortedRooms(rooms);
    setFeaturedRooms(featuredRooms);
    setLoading(false);
    setFormValues({
      ...formValues,
      maxPrice,
      price: maxPrice,
      maxSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

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

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const filterRooms = () => {
    let tempRooms = [...rooms];

    if (type !== 'all') {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => parseInt(room.capacity) >= parseInt(capacity));
    }

    tempRooms = tempRooms.filter((room) => parseInt(room.price) <= parseInt(price));

    tempRooms = tempRooms.filter((room) => room.size >= minSize && room.size <= maxSize);

    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    setSortedRooms(tempRooms);
  };

  const { price, maxPrice, maxSize, minSize, type, capacity, minPrice, breakfast, pets } = formValues;

  return (
    <RoomContext.Provider
      value={{
        rooms,
        featuredRooms,
        sortedRooms,
        loading,
        getRoom,
        price,
        maxPrice,
        maxSize,
        minSize,
        handleChange,
        type,
        capacity,
        minPrice,
        breakfast,
        pets,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomsData = () => {
  const {
    rooms,
    featuredRooms,
    sortedRooms,
    loading,
    getRoom,
    price,
    maxPrice,
    maxSize,
    minSize,
    handleChange,
    type,
    capacity,
    minPrice,
    breakfast,
    pets,
  } = useContext(RoomContext);

  return {
    rooms,
    featuredRooms,
    sortedRooms,
    loading,
    getRoom,
    price,
    maxPrice,
    maxSize,
    minSize,
    handleChange,
    type,
    capacity,
    minPrice,
    breakfast,
    pets,
  };
};

export default RoomProvider;
