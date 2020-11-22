import React from "react";
import './Images.scss';
import HeaderTitle from "../UI/HeaderTitle/HeaderTitle";
import { requestFiles, fileForm } from "../../models/files-data";
import Form from "./Form/Form";
import List from "./List/List";

class Images extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        fileForm();
        await requestFiles();
    }

    componentWillUnmount = () => {

    }

    render() {

        return (
            <section className="images__section">
                <HeaderTitle title="Images" />
                <Form />
                <List />
            </section>
        );
    }

}

export default Images;