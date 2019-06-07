import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../stylesheets/notifications.css';

import {fetchNotifications, clearNotifications} from "../actions";

class Notifications extends Component {
    constructor() {
        super();

        this.renderNotificationsList = this.renderNotificationsList.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    render() {
        switch (this.props.auth) {
            case null:
                return null;
            case false:
                return <Redirect to="/"/>;
            default:
                return (
                    <div id="notifications_list_page">
                        <ul id="notifications_list">
                            {this.renderNotificationsList()}
                        </ul>
                    </div>
                );
        }
    }

    componentDidMount() {
        this.props.fetchNotifications();
    }

    componentWillUnmount() {
        this.props.clearNotifications();
    }

    renderNotificationsList() {
        let self = this;

        if (!this.props.myNotifications || this.props.myNotifications.length === 0)
            return null;
        else
            return this.props.myNotifications.map(
                function (v, i) {
                    return (
                        <li key={i} pos={i} onClick={self.clickHandler}>
                            <div pos={i} onClick={self.clickHandler}>
                                {v.text}
                            </div>
                        </li>
                    )
                }
            )
    }

    clickHandler(event) {
        let pos = event.target.getAttribute('pos');

        window.location.assign(this.props.myNotifications[pos].url);
    }
}

function mapStateToProps({auth, myNotifications}) {
    return {auth, myNotifications};
}

export default connect(mapStateToProps, {fetchNotifications, clearNotifications})(Notifications);