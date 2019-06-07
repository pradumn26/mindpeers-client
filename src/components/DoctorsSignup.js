import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../stylesheets/doctorssignup.css';

class DoctorsSignup extends Component{
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        switch (this.props.auth) {
            case null:
                return null;
            case false:
                return (
                    <div id="doctors_signup">
                        <div id="doc_signup_card">
                            <h1>
                                Doctor's Signup
                            </h1>

                            <form id="f3" method="POST" action="/doctorsSignup">
                                <span id="f3_error" className="error_span"/>
                                <input id="f3_name" name="name" type="text" placeholder="Full Name"/>
                                <input id="f3_email" name="email" type="email" placeholder="Email"/>
                                <input id="f3_phone" name="phone" type="tel" placeholder="Contact"/>
                                <input id="f3_city" name="city" type="city" placeholder="Enter city"/>
                                <input id="f3_specialisation" name="specialisation" type="text" placeholder="Specialised in?"/>
                                <input id="f3_password" name="password" type="password" placeholder="Choose a password"/>
                                <button className="login_button" onClick={this.onSubmit}>SUBMIT</button>
                            </form>
                        </div>
                    </div>
                );
            default:
                return <Redirect to="/"/>;
        }
    }

    onSubmit(event) {
        event.preventDefault();
        let name = document.getElementById('f3_name').value.trim();
        let email = document.getElementById('f3_email').value.trim();
        let phone = document.getElementById('f3_phone').value.trim();
        let city = document.getElementById('f3_city').value.trim();
        let specialisation = document.getElementById('f3_specialisation').value.trim();
        let password = document.getElementById('f3_password').value.trim();

        if (!name || !email || !phone || !city || !specialisation || !password)
            document.getElementById('f3_error').innerText = 'Some of the fields are empty!!';
        else
            document.getElementById('f3').submit();
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(DoctorsSignup);