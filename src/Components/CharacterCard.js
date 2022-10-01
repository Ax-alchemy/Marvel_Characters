import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CharacterCard = (props) => {
    const character = props.character;
    const remove = props.remove;
    const img_url = character.thumbnail.path + "." + character.thumbnail.extension;
    const [show, setShow] = useState(false);

    // console.log(character);
    //set boolean variable to display popup
    const popup = () => {
        setShow(true);
    }

    //call saveHandler in parent component and pass the character for which save is clicked
    const saveCharacter = () => {
        props.saveHandler(character);
    }

    //call removeHandler in parent component and pass the character for which remove is clicked
    const removeCharacter = () => {
        props.removeHandler(character);
    }

    return (
        <>
            <div className="card col col-md-3 col-lg-3" style={{ width: "18rem", height:"auto", margin: "3rem 1rem 2rem 1rem" }}>
                <button className="btn" onClick={popup} style={{ marginBottom: "8px" }}>
                    <img className="card-img-top" src={img_url} alt="Card image cap" style={{  height:"18vw", width: "18vw"}} />
                    <div className="card-body">
                        <h5 className="card-title" style={{ textAlign: "center" }}>{character.name}</h5>
                    </div>
                </button>

                {remove ? <button className="btn btn-danger" style={{ width: "40%", margin: "auto", marginBottom: "1rem" }}
                    onClick={removeCharacter}
                >Remove</button> :
                    <button className="btn btn-success" style={{ width: "40%", margin: "auto", marginBottom: "1rem" }}
                        onClick={saveCharacter}
                    >Save</button>
                }
            </div>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <p>{character.name}</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="card-img-top" src={img_url} alt="Card image cap"
                        style={{ height: "200px", width: "200px", margin: "auto", display: "flex" }} />
                    <h4 style={{ margin: "1rem 0 0 0" }}>Description: </h4>{character.description}
                    <h4>Comics:</h4>
                    <ul>
                        {character.comics.items ? character.comics.items.map((item, i) => {
                            return (
                                <li key={i}>{item.name}</li>
                            )
                        }) : "No comics"}
                    </ul>
                    <h4>Series:</h4>
                    <ul>
                        {character.series.items ? character.series.items.map((item, i) => {
                            return (
                                <li key={i}>{item.name}</li>
                            )
                        }) : "No series"}
                    </ul>
                    <h4>Stories:</h4>
                    <ul>
                        {character.stories.items ? character.stories.items.map((item, i) => {
                            return (
                                <li key={i}>{item.name}</li>
                            )
                        }) : "No stories"}
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CharacterCard;

