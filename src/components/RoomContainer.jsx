import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { useRoomsData } from '../context/RoomContext';
import Loading from './Loading';

const RoomContainer = () => {
  const { loading } = useRoomsData();

  if (loading) return <Loading />;

  return (
    <>
      <RoomFilter />
      <RoomList />
    </>
  );
};

export default RoomContainer;
