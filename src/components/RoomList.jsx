import React from 'react';
import { useRoomsData } from '../context/RoomContext';
import Room from './Room';

const RoomList = () => {
  const { sortedRooms } = useRoomsData();

  if (sortedRooms.length === 0) {
    return (
      <div className='empty-search'>
        <h3>unfortunately no rooms matches your search parameters</h3>
      </div>
    );
  }

  return (
    <section className='roomslist'>
      <div className='roomslist-center'>
        {sortedRooms.map((item) => {
          return <Room key={item.id} room={item} />;
        })}
      </div>
    </section>
  );
};

export default RoomList;
