import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoginPage from './LoginPage';
import DoctorsHome from './DoctorsHome';
import UsersHome from './UsersHome';

class LandingPage extends Component {
    render() {
        switch (this.props.auth) {
            case false:
                return <LoginPage/>;
            case null:
                return null;
            default:
                if (this.props.auth.authType == 'doctors-auth')
                    return <DoctorsHome/>;
                else
                    return <UsersHome/>;
        }
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(LandingPage);