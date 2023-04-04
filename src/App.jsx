import React from 'react';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/rooms/:slug' element={<SingleRoom />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
