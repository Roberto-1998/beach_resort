import React from 'react';
import { useRoomsData } from '../context/RoomContext';
import Loading from './Loading';
import Room from './Room';
import Title from './Title';

const FeaturedRooms = () => {
  const { featuredRooms, loading } = useRoomsData();

  return (
    <section className='featured-rooms'>
      <Title title={'Featured Rooms'} />
      <div className='featured-rooms-center'>
        {loading ? <Loading /> : featuredRooms.map((room) => <Room key={room.id} room={room} />)}
      </div>
    </section>
  );
};

export default FeaturedRooms;
