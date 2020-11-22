import React from "react";
import './List.scss';
import HeaderTitle from "../../UI/HeaderTitle/HeaderTitle";
import { Link } from "react-router-dom";

class List extends React.Component {

    constructor(props) {
        super(props);
    }a

    render() {
        return (
            <section className="orders__section">
                <HeaderTitle title="Orders" />
                <ul>
                    <li><Link to="/orders/one">1 order</Link></li>
                    <li><Link to="/orders/two">2 order</Link></li>
                    <li><Link to="/orders/three">3 order</Link></li>
                </ul>
            </section>
        );
    }

}

export default List;