import React, { useRef, useState } from "react";
import CharacterCard from "./CharacterCard";
import api from '../api/characters';
import Loader from "./Loader";
import { Link } from "react-router-dom";
import {useCookies} from 'react-cookie';

const Characters = (props) => {
    const inputE = useRef("");
    const pagecount = props.pagecount;
    const total = props.total;
    const curCount = props.curCount;
    const offset = props.offset;
    const loader = props.loader;
    const [searchKey, setSearchKey] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['skey']);

    //fetch the search key from the search bar, and set to searchKey and also pass the value to parent component
    const getSearchTerm = () => {
        setCookie('skey', inputE.current.value, { path: '/' });
        setSearchKey(inputE.current.value);
        props.searchKey(cookies.skey);
    }

    //when clicked on next, increase page count. Pass both page count and searchKey to the parent component
    const next = () => {
        props.next(pagecount + 1, cookies.skey);
    }

    //when clicked on prev, decrease page count. Pass both page count and searchKey to the parent component
    const prev = () => {
        props.prev(pagecount - 1, cookies.skey);
    }

    //when clicked on save, it checks if the character is already saved. if it is saved then ignore it, otheriwse save it
    const saveHandler = async (character) => {
        const response = await api.get('/characters');
        let flag = 0;
        const characters = response.data;
        for (let i in characters) {
            if (characters[i].id === character.id)
                flag = 1;
        }
        if (flag === 0) {
            await api.post("/characters", character)
                .catch(function (error) {
                    console.log(error.toJSON());
                });
        }
    }

    //call function in parent component when saved is clicked
    const savedCharacters = () => {
        props.saved();
    }

    //render the current characters we passed as prop, calls a different component to display character as a card
    const renderCharacters = props.characters.map((character) => {
        return (
            <CharacterCard character={character} key={character.id} loader={loader} saveHandler={saveHandler} />
        );
    });

    return (
        <div>
            <div className="input-group" style={{ width: "100%", display: "flex", margin: "2rem" }}>
                <div className="form-outline" style={{ margin: "auto", display: "inline-block" }}>
                    <input ref={inputE} type="search" id="form1" className="form-control"
                        onChange={getSearchTerm}/>
                </div>
                <div style={{ display: "inline-block", marginRight: "8%", marginLeft: "-8%" }}>
                    <Link to='/savedCharacters' onClick={savedCharacters}>
                        <button className="btn btn-warning">Saved</button>
                    </Link>
                </div>
            </div>
            {loader ? <Loader /> :
                <div style={{ width: "100%", display: "flex" }}>
                    <div className='row' style={{ margin: "auto" }}>
                        {renderCharacters.length > 0 ? renderCharacters : "No characters available"}
                    </div>
                </div>
            }
            {/* <!-- Button trigger modal --> */}
            {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button> */}

            {/* <!-- Modal --> */}
            {loader ? "" :
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ margin: "auto" }}>
                        {pagecount > 0 ? <button className="btn btn-primary" style={{ margin: "0 1rem" }}
                            onClick={prev}>
                            Prev</button> : ""}
                        {offset + curCount < total ? <button className="btn btn-primary" onClick={next}>Next</button> : ""}
                    </div>
                </div>
            }
        </div>
    )
}

export default Characters;