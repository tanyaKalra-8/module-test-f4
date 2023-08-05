import React from "react";
import Header from "./Components/Header";
import { BrowserRouter ,Route, Routes } from "react-router-dom";
import Item from "./Components/Item";
import Error from "./Components/Error";
import Home from "./Components/Home";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer'; 

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header/>}>
              <Route index element={<Home/>}/>
              <Route path="/item/:id" element= {<Item/>}/>
            </Route>
              <Route path="/*" element= {<Error/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
