import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {

    //call characterHandler in parent component
    const characterHandler = () => {
        props.characterHandler();
    }
    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand" style={{ backgroundColor: "#312d2a" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={characterHandler}><h2>Marvel's</h2></Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;