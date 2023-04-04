import React from 'react';
import { FaBeer, FaCocktail, FaHiking, FaShuttleVan } from 'react-icons/fa';
import Title from './Title';

const services = [
  {
    icon: <FaCocktail />,
    title: 'free cocktails',
    info: 'Lorem ipsum',
  },
  {
    icon: <FaHiking />,
    title: 'Endless Hiking',
    info: 'Lorem ipsum',
  },
  {
    icon: <FaShuttleVan />,
    title: 'Free shuttle',
    info: 'Lorem ipsum',
  },
  {
    icon: <FaBeer />,
    title: 'Strongest Beer',
    info: 'Lorem ipsum',
  },
];

const Services = () => {
  return (
    <section className='services'>
      <Title title='services' />
      <div className='services-center'>
        {services.map((item, index) => (
          <article key={index} className='service'>
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
