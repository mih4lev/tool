import React from "react";
import './NetworkLine.scss';
import { checkUpdate } from "../../../models/files-sync";

class NetworkLine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOnline: navigator.onLine
        }
    }

    changeState = async () => {
        this.setState({ isOnline: navigator.onLine });
        if (navigator.onLine) await checkUpdate();
    };

    componentDidMount = () => {
        window.addEventListener(`online`, this.changeState);
        window.addEventListener(`offline`, this.changeState);
    }

    componentWillUnmount = () => {
        window.removeEventListener(`online`, this.changeState);
        window.removeEventListener(`offline`, this.changeState);
    }

    render() {
        const { state: { isOnline }} = this;

        const onlineNode = <div className="network__line network__line--online">Online</div>;
        const offlineNode = <div className="network__line network__line--offline">Offline</div>;
        const lineNode = (isOnline) ? onlineNode : offlineNode;

        return (
            <div>{lineNode}</div>
        );
    }

}

export default NetworkLine;