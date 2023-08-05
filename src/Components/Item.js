import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../redux/action';
import "../Styles/item.css"
import { useNavigate } from 'react-router-dom';
import back from "../Resources/Vector 12.png"

const Item = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data if not already available in the store
    if (data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Find the item once the data is available
  const item = data.find((item) => item.id === parseInt(id, 10));

  if (!item) {
    return <div>Item not found.</div>;
  }

  // Filter out the current item and get 5 random suggestions
  const suggestions = data.filter((post) => post.id !== parseInt(id, 10)).slice(0, 5);

  function goBack(){
    navigate(-1);
  }

  return (
    <div className='main'>
      <h1> <button onClick={goBack}><img src={back} alt='go back'/></button> Post Number {item.id}</h1>
      <div className='item-container'>
        <div>
          <img src={item.imgSrc} alt={`${item.id}`} id='item-img'/>
        </div>
        <div>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <p>User ID: {item.userId}</p>
        </div>
      </div>

      <h3>More Posts:</h3>
      <ul className='more-posts'>
        {suggestions.map((post) => (
          <li key={post.id} className='list-posts'>
            <img src={post.imgSrc} alt={`${post.id}`} className='posts'/>
            <h4>{post.title}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Item;
