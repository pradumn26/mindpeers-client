import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../stylesheets/todaysappointments.css';

import {fetchTodaysAppointments, confirmAppointment} from "../actions";

class TodaysAppointments extends Component{
    constructor() {
        super();

        this.renderAppointmentsList = this.renderAppointmentsList.bind(this);
        this.confirmButton = this.confirmButton.bind(this);
        this.renderConfirmButton = this.renderConfirmButton.bind(this);
    }

    render() {
        switch (this.props.auth) {
            case null:
                return null;
            case false:
                return <Redirect to="/"/>;
            default:
                if (this.props.auth.authType == 'doctors-auth')
                    return (
                        <div id="t_appointments_list_page">
                            <ul id="t_appointments_list">
                                {this.renderAppointmentsList()}
                            </ul>
                        </div>
                    );
                else
                    return <Redirect to="/"/>;
        }
    }

    componentDidMount() {
        this.props.fetchTodaysAppointments();
    }

    renderAppointmentsList() {
        let self = this;

        console.log(this.props.todaysAppointments);
        if (!this.props.todaysAppointments || this.props.todaysAppointments.length === 0)
            return null
        else
            return this.props.todaysAppointments.map(
                function (v, i) {
                    return (
                        <li key={i}>
                            <img src="/images/user_image.png"/>
                            <div>
                                {v.user_name}<br/>
                                {v.user_medical_condition}<br/>
                                {v.date}<br/>
                                {v.startTime} - {v.endTime}<br/>
                                {v.status}
                            </div>
                            {self.renderConfirmButton(i)}
                        </li>
                    )
                }
            )
    }

    confirmButton(event) {
        console.log("in confirmButton");
        let pos = event.target.getAttribute('pos');

        this.props.confirmAppointment(this.props.todaysAppointments[pos]._id, pos);
    }

    renderConfirmButton(pos) {
        if (this.props.todaysAppointments[pos].status == 'confirmed')
            return (<div className="confirm_div">Confirmed</div>);
        else
            return <button className="btn" onClick={this.confirmButton} pos={pos}>Confirm</button>;
    }
}

function mapStateToProps({auth, todaysAppointments}) {
    return {auth, todaysAppointments};
}

export default connect(mapStateToProps, {fetchTodaysAppointments, confirmAppointment})(TodaysAppointments);