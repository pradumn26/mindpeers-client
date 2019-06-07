import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class DoctorsHome extends Component{
    render() {
        switch (this.props.auth) {
            case false:
                return <Redirect to="/"/>;
            case null:
                return null;
            default:
                if (this.props.auth.authType == 'doctors-auth')
                    return <Redirect to="/todaysAppointments"/>;
                else
                    return <Redirect to="/"/>
        }
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(DoctorsHome);