import React from "react";
import './HeaderTitle.scss';

class HeaderTitle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { props: { title }} = this;
        return (
            <h1 className="header-title">{title}</h1>
        );
    }

}

export default HeaderTitle;