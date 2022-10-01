import React, { useState, useEffect } from 'react';
import api from './api/characters'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from './Components/Characters';
import SavedCharacters from './Components/SavedCharacters';
import Header from './Components/Header';

function App() {
  let port = "https://gateway.marvel.com/v1/public/characters?ts=1632998235&limit=3&offset="
  let api_key = "&apikey=ff7d1b4aefa575448f941959adefe76d&hash=bc74402412971310d7a50ccd0dff3c7b"

  const [pagecount, setPageCount] = useState(0);  //cuurent page number
  const [offset,setOffset] = useState(0);         //current offset
  const [curCount, setCurCount] = useState(0);    //characters on current page
  const [total,setTotal] = useState(0);           //total characters for particular api call
  const [curCharacters, setCurCharacters] = useState([]);  //current characters
  const [savedCharacters,setSavedCharacters] = useState([]); //saved characters
  const [searchKey, setSearchKey] = useState("");            //search key used in api call
  const [loader, setLoader] = useState(false);               //boolean loader variale to display loader
  const [totSavedChar,setTotSavedChar] = useState(0);

  //when value is changed in search bar, this function set page count to 0, and search key to value in the search bar
  const searchHandler = async (searchKeyWord) => {
    setPageCount(0);
    setSearchKey(searchKeyWord);
  }

  //when next button is clicked, it assigns page count and search key word, count and search keyword are passed from child component
  const nextHandler = async (ct, searchKeyWord) => {
    setPageCount(ct);
    setSearchKey(searchKeyWord);
  }

  //when prev button is clicked, it assigns page count and search key word, count and search keyword are passed from child component
  const prevHandler = (ct,searchKeyWord) => {
    setPageCount(ct);
    setSearchKey(searchKeyWord);
  }

  //when saved button is clicked, it fetches the saved characters
  const savedCharactersHandler = async () => {
    const response = await api.get('/characters');
    setTotSavedChar(response.data.length);
    return response.data;
  }

  //when home button is clicked it resets page count and search keyword
  const characterHandler = () => {
    setPageCount(0);
    setSearchKey("");
  }

  //update saved characters when savedCharacters array changed
  useEffect(()=>{
    async function getSavedCharacters() {
      const allSavedCharacters = await savedCharactersHandler();
      if(allSavedCharacters) setSavedCharacters(allSavedCharacters);
    };
    getSavedCharacters();
  },[totSavedChar]);

  //retrieve characters based on current page and search keyword
  useEffect(() => {
    async function retrieveCharacters() {
      let myurl;
      setLoader(true);
      if (searchKey !== "") {
        myurl = port + (pagecount * 3).toString() + "&nameStartsWith=" + searchKey + api_key;
      }
      else {
        myurl = port + (pagecount * 3).toString() + api_key;
      }
      const response = await api({
        method: 'get',
        url: myurl
      });
      setLoader(false);
      if (response.data.data.results) {
        setCurCharacters(response.data.data.results);
        setOffset(response.data.data.offset);
        setCurCount(response.data.data.count);
        setTotal(response.data.data.total);
      }
      else{
        setCurCharacters([]);
        setOffset(0);
        setTotal(0);
        setCurCount(0);
      }
    }
    
    retrieveCharacters();
    
  }, [pagecount, searchKey]);

  return (
    <div >
      <Router>
        <Header
        characterHandler={characterHandler}/>
        <Routes>
          <Route path='/' element={<Characters
            characters={curCharacters}
            pagecount={pagecount}
            curCount={curCount}
            total={total}
            offset={offset}
            loader={loader}
            skey={searchKey}
            next={nextHandler}
            prev={prevHandler}
            saved={savedCharactersHandler}
            searchKey={searchHandler}
          />}
          />
          <Route path='/savedCharacters' element={<SavedCharacters
            characters={savedCharacters}
            saved={savedCharactersHandler}
          />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
