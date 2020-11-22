import React from "react";
import './Navigation.scss';
import { NavLink } from "react-router-dom";

class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navigation">
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <NavLink to="/" exact className="navigation__link"
                                 activeClassName="navigation__link--active">Main</NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink to="/images" className="navigation__link"
                                 activeClassName="navigation__link--active">Images</NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink to="/orders" className="navigation__link"
                                 activeClassName="navigation__link--active">Orders</NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink to="/forms" className="navigation__link"
                                 activeClassName="navigation__link--active">Forms</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }

}

export default Navigation;