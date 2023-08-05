import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/action';
import { Link } from 'react-router-dom';
import '../Styles/home.css';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    // Filter data based on the search term
    const filteredPosts = data.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredPosts);
  }, [data, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className="main">
      <h1>
        Social Media For Travellers <br />
        <input
          type='search'
          placeholder='Search Here...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </h1>
      <div className="container">
        {filteredData.map((item) => (
          <div className='card' key={item.id}>
            <img src={`https://picsum.photos/200?random=${item.id}`} alt={`${item.id}`} />
            <h2>{item.title}</h2>
            <p>
              {item.body.slice(0, 100)}...{' '}
              <Link to={`/item/${item.id}`} className='link'>
                Read More...
              </Link>
            </p>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Home;
