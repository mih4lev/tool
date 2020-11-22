import React from "react";
import './ReloadButton.scss';

class ReloadButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
    }

    showButton = () => {
        this.setState({ isVisible: true });
    }

    componentDidMount = () => {
        document.addEventListener(`APP_UPDATE`, this.showButton);
    }

    componentWillUnmount = () => {
        document.removeEventListener(`APP_UPDATE`, this.showButton);
    }

    clickHandler = (event) => {
        event.preventDefault();
        location.reload();
    }

    render() {
        const { props: { title }, state: { isVisible }, clickHandler } = this;

        const selector = (isVisible) ? `reload__button` : `reload__button reload__button--hidden`;

        return (
            <button className={selector} type="button" onClick={clickHandler}>{title}</button>
        );
    }

}

export default ReloadButton;