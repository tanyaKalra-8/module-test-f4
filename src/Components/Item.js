import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../redux/action';
import "../Styles/item.css"
import { useNavigate } from 'react-router-dom';

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
      <h1> <button onClick={goBack}>{"<--"}</button> Post Number {item.id}</h1>
      <div className='item-container'>
        <div>
          <img src={item.imgSrc} alt={`${item.id}`} />
        </div>
        <div>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <p>User ID: {item.userId}</p>
        </div>
      </div>

      <h3>More Posts:</h3>
      <ul>
        {suggestions.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <img src={post.imgSrc} alt={`${post.id}`} />
            <p>{post.body}</p>
            <p>User ID: {post.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Item;
