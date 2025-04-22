import Nothing from "../utils/nothing.ts";
import * as React from "react";
import "../styles/header.css";
import {FaFacebook, FaInstagram, FaTiktok} from "react-icons/fa6";
import {FaEllipsisV} from "react-icons/fa";

type State = {
    isNavVisible: boolean;
}

class Header extends React.Component<Nothing, State> {
    constructor(props: Nothing) {
        super(props);
        this.state = { isNavVisible: false };
    }

    toggleNav = () => {
        this.setState((prevState) => ({ isNavVisible: !prevState.isNavVisible }));
    };

    render() {
        return (
            <div className="header">
                <a href="./"><img src="./images/logo.png" alt="logo" /></a>
                <nav className={this.state.isNavVisible ? "visible" : ""}>
                    <a href="/mission">Mission</a>
                    <a href="/articles">Articles</a>
                    <a href="/quizes">Quizes</a>
                </nav>
                <a href="#" className="mobile-menu" onClick={this.toggleNav}>
                    <FaEllipsisV className="icon" />
                </a>
                <div className="icons">
                    <a href="#"><FaFacebook className="icon" /></a>
                    <a href="#"><FaTiktok className="icon" /></a>
                    <a href="#"><FaInstagram className="icon" /></a>
                </div>
            </div>
        )
    }
}

export default Header;