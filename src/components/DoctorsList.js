import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../stylesheets/doctorslist.css'

import BookingModal from './BookingModal';
import {fetchDoctors} from "../actions";

class DoctorsList extends Component {
    constructor() {
        super();

        this.renderDoctorsList = this.renderDoctorsList.bind(this);
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
                        <div id="doctors_list_page">
                            <ul id="doctors_list">
                                {this.renderDoctorsList()}
                            </ul>

                            <BookingModal/>
                        </div>
                    );
        }
    }

    componentDidMount() {
        this.props.fetchDoctors();
    }

    renderDoctorsList() {
        if (!this.props.doctorsList || this.props.doctorsList.length === 0)
            return null
        else
            return this.props.doctorsList.map(
                function (v, i) {
                    return (
                        <li key={i}>
                            <img src="/images/doctor_image.png"/>
                            <div>
                                Dr. {v.name}<br/>
                                Specialisation: {v.specialisation}
                            </div>
                            <button className="btn" data-toggle="modal" data-target="#booking_modal" data-pos={i}>Book</button>
                        </li>
                    )
                }
            )
    }
}

function mapStateToProps({auth, doctorsList}) {
    return {auth, doctorsList};
}

export default connect(mapStateToProps, {fetchDoctors})(DoctorsList);