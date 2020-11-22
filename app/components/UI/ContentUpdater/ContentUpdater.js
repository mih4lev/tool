import React from "react";
import './ContentUpdater.scss';
import {checkUpdate, fromServerToClient} from "../../../models/files-sync";

class ContentUpdater extends React.Component {

    constructor(props) {
        super(props);
    }

    connectWS = async (event) => {
        const data = await JSON.parse(event.data);
        if (data.action === `updateDB`) await fromServerToClient();
    };

    componentDidMount = async () => {
        // connect to WS for updates
        const URL = location.host;
        const protocol = (location.protocol === `http:`) ? `ws://` : `wss://`;
        this.WS = new WebSocket(protocol + URL);
        this.WS.addEventListener(`message`, this.connectWS);
        // indexedDB check
        await checkUpdate();
    }

    componentWillUnmount() {
        this.WS.removeEventListener(`message`, this.connectWS);
        this.WS.close();
    }

    render() {
        return (
            <div className="content__updater" />
        );
    }

}

export default ContentUpdater;