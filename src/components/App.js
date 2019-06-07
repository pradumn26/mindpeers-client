import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import LandingPage from './LandingPage';
import Header from './Header';
import UsersSignUp from './UsersSignup';
import DoctorsSignUp from './DoctorsSignup';
import DoctorsList from './DoctorsList';
import MyAppointments from './MyAppointments';
import Notifications from './Notifications';
import TodaysAppointments from './TodaysAppointments';
import {fetchUser} from "../actions";

class App extends Component{
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path='/' component={LandingPage}/>

                        <Route exact path='/usersSignUp' component={UsersSignUp}/>
                        <Route exact path='/doctors' component={DoctorsList}/>
                        <Route exact path='/myAppointments' component={MyAppointments}/>
                        <Route exact path='/notifications' component={Notifications}/>

                        <Route exact path='/doctorsSignUp' component={DoctorsSignUp}/>
                        <Route exact path='/todaysAppointments' component={TodaysAppointments}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchUser();
    }
}

export default connect(null, {fetchUser})(App);