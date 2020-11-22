import React from "react";
import './Main.scss';
import HeaderTitle from "../UI/HeaderTitle/HeaderTitle";

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="main__section">
                <HeaderTitle title="Main" />
                <p>Some text description for app...</p>
            </section>
        );
    }

}

export default Main;