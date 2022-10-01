import React from "react";
import CharacterCard from "./CharacterCard";
import api from '../api/characters';

const SavedCharacters = (props) => {
    //delete a character from saved character
    const removeHandler = async (character) => {
        await api.delete(`/characters/${character.id}`);
        props.saved();
    }

    //render the saved characters we passed as prop, calls a different component to display character as a card
    const renderCharacters =props.characters.map((character,i) => {
        return (
            <CharacterCard character={character} key={i} remove={true} removeHandler={removeHandler}/>
        );
    });
    return(
        <>
            <div style={{ width: "100%", display: "flex",alignContent: "center" }}>
                <div className='row' style={{ margin: "auto", justifyContent:"center" }}>
                    {renderCharacters.length > 0 ? renderCharacters : "No characters available"}
                </div>
            </div>
        </>
    );
}

export default SavedCharacters;