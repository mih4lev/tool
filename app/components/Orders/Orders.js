import React from "react";
import { Switch, Route } from "react-router-dom";
import List from "./List/List";
import Single from "./Single/Single";

class Orders extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/orders" component={List} />
                <Route path="/orders/:id" component={Single} />
            </Switch>
        );
    }

}

export default Orders;