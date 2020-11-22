import React from "react";
import './Single.scss';
import { Link } from "react-router-dom";
import HeaderTitle from "../../UI/HeaderTitle/HeaderTitle";

class Single extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { props: { match: { params: { id: orderID }}}} = this;
        const pageTitle = `Order ` + orderID;
        return (
            <section className="order__section">
                <HeaderTitle title={pageTitle} />
                <Link to="/orders" className="order__back-button">Back to orders</Link>
            </section>
        );
    }

}

export default Single;