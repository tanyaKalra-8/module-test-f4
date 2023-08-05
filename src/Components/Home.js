import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/action';
import { Link } from 'react-router-dom';
import "../Styles/home.css"

const Home = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <nav className="main">
      <h1>Social Media For Travellers <br/>
      <input type='search' placeholder='Search Here...'/></h1>
      <div className="container">
      {data.map((item) => (
        <div className='card' key={item.id}>
          {/* <div className='card'> */}
            <img src={`https://picsum.photos/200?random=${item.id}`} alt={`Image-${item.id}`} />
            <h2>{item.title}</h2>
            <p>{item.body.slice(0, 100)}... <Link to={`/item/${item.id}`} className='link'>Read More...</Link></p>
          {/* </div> */}
        </div>
      ))}
    </div>
  </nav>
  )
}

export default Home;