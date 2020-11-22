import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.scss';
import ReloadButton from "./components/UI/ReloadButton/ReloadButton";
import NetworkLine from "./components/UI/NetworkLine/NetworkLine";
import Navigation from "./components/UI/Navigation/Navigation";
import Main from "./components/Main/Main";
import Images from "./components/Images/Images";
import Orders from "./components/Orders/Orders";
import Forms from "./components/Forms/Forms";
import ContentUpdater from "./components/UI/ContentUpdater/ContentUpdater";

class App extends React.Component{

    render() {
        return (
            <div className="app">
                <Router>
                    <ReloadButton title="Update" />
                    <NetworkLine />
                    <Navigation />
                    <ContentUpdater />
                    <main className="main__wrapper">
                        <Switch>
                            <Route path="/" exact component={Main} />
                            <Route path="/images" component={Images} />
                            <Route path="/orders" component={Orders} />
                            <Route path="/forms" component={Forms} />
                        </Switch>
                    </main>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));