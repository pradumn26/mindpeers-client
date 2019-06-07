import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../stylesheets/myappointments.css';

import {fetchMyAppointments} from "../actions";

class MyAppointments extends Component{
    constructor() {
        super();

        this.renderAppointmentsList = this.renderAppointmentsList.bind(this);
    }

    render() {
        switch (this.props.auth) {
            case null:
                return null;
            case false:
                return <Redirect to="/"/>;
            default:
                if (this.props.auth.authType == 'doctors-auth')
                    return <Redirect to="/"/>;
                else
                    return (
                        <div id="appointments_list_page">
                            <ul id="appointments_list">
                                {this.renderAppointmentsList()}
                            </ul>
                        </div>
                    );
        }
    }

    componentDidMount() {
        this.props.fetchMyAppointments();
    }

    renderAppointmentsList() {
        if (!this.props.myAppointments || this.props.myAppointments.length === 0)
            return null;
        else
            return this.props.myAppointments.map(
                function (v, i) {
                    return (
                        <li key={i}>
                            <img src="/images/doctor_image.png"/>
                            <div>
                                Dr. {v.doctor_name}<br/>
                                {v.date}<br/>
                                {v.startTime} - {v.endTime}<br/>
                                {v.status}
                            </div>
                        </li>
                    )
                }
            )
    }
}

function mapStateToProps({auth, myAppointments}) {
    return {auth, myAppointments};
}

export default connect(mapStateToProps, {fetchMyAppointments})(MyAppointments);