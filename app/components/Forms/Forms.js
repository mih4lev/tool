import React from "react";
import './Forms.scss';
import HeaderTitle from "../UI/HeaderTitle/HeaderTitle";

class Forms extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="forms__section">
                <HeaderTitle title="Forms" />
            </section>
        );
    }

}

export default Forms;