import React, { useEffect, useState } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import { Link, useParams } from 'react-router-dom';
import { useRoomsData } from '../context/RoomContext';
import { StyledHero } from '../components/StyledHero';
import Banner from '../components/Banner';

const SingleRoom = () => {
  const [room, setRoom] = useState({});
  const [error, setError] = useState(false);
  const { slug } = useParams();
  const { getRoom } = useRoomsData();

  const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;

  useEffect(() => {
    let room = getRoom(slug);
    if (room) {
      console.log(room);
      setRoom(room);
    } else {
      console.log('Nada bro');
      setError(true);
    }
  }, [getRoom, slug]);

  if (error) {
    return (
      <div className='error'>
        <h3>no such room could be found...</h3>
        <Link to={'/rooms'} className='btn-primary'>
          back to rooms
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <StyledHero img={images ? images[0] : defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to={'/rooms'} className='btn-primary'>
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className='single-room'>
          {images && (
            <div className='single-room-images'>
              {images.map((item, index) => {
                if (index === 0) return null;

                return <img key={index} src={item} alt={name} />;
              })}
            </div>
          )}
          <div className='single-room-info'>
            <article className='desc'>
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className='info'>
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>Max Capacity : {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
              <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
              <h6>{breakfast && 'free breakfast-included'}</h6>
            </article>
          </div>
        </section>
        {extras && (
          <section className='room-extras'>
            <h6>extras</h6>
            <ul className='extras'>
              {extras.map((item, index) => {
                return <li key={index}>- {item}</li>;
              })}
            </ul>
          </section>
        )}
      </>
    );
  }
};

export default SingleRoom;
