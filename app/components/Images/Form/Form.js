import React from "react";
import './Form.scss';

class Form extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {

    }

    componentWillUnmount = () => {

    }

    render() {

        return (
            <form className="images__form">
                <input type="file" className="file__field" />
                <button type="submit" className="submit__button">Save</button>
            </form>
        );
    }

}

export default Form;