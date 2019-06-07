import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import '../stylesheets/bookingmodal.css';

class BookingModal extends Component {
    constructor() {
        super();

        this.confirmButton = this.confirmButton.bind(this);
        this.bookingButton = this.bookingButton.bind(this);
        this.renderConfirmButton = this.renderConfirmButton.bind(this);
        this.renderModalBody = this.renderModalBody.bind(this);
        this.state = {slots: null, selectedSlot: -1, bookingDone: false, msg: ''};
    }

    render() {
        return (
            <div className="modal fade" id="booking_modal" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Time Slots for today</h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.renderModalBody()}
                        </div>
                        <div className="modal-footer">
                            {this.renderConfirmButton()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let $ = window.$;
        let self = this;

        $('#booking_modal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget)
            let pos = button.data('pos');
            let doctor_id = self.props.doctorsList[pos]._id;
            self.doctor_id = doctor_id;

            axios.post('/fetchTimeSlots', {doctor_id})
                .then(function (res) {
                    console.log(res.data);
                    self.setState({slots: res.data, selectedSlot: self.state.selectedSlot, bookingDone: false, msg: ''});
                })
        });

        $('#booking_modal').on('hidden.bs.modal', function (event) {
            self.setState({slots: null, selectedSlot: -1, bookingDone: false, msg: ''})
        })
    }

    renderModalBody() {
        let self = this;

        if (this.state.bookingDone) {
            return (
                <div>{this.state.msg}</div>
            )
        }

        if (this.state.slots) {
            return (
                <ul>
                    {
                        (function () {
                            return self.state.slots.map(function (v, i) {
                                let classList = "btn btn-outline-secondary";

                                if (v.enable && self.state.selectedSlot == i) {
                                    classList += " booking_btn_green";
                                } else if (!v.enable){
                                    classList += " booking_btn_red";
                                }

                                return (
                                    <li key={i}>
                                        <button className={classList} onClick={v.enable ? self.bookingButton : ()=> {}} pos={i}>
                                            {v.startTime}-{v.endTime}
                                        </button>
                                    </li>
                                )
                            })
                        })()
                    }
                </ul>
            )
        } else {
            return "Loading....";
        }
    }

    renderConfirmButton() {
        if (this.state.selectedSlot === -1 || this.state.bookingDone)
            return (<button disabled type="button" className="btn">Confirm</button>);
        else
            return (<button type="button" className="btn" onClick={this.confirmButton}>Confirm</button>);
    }

    bookingButton(event) {
        let button = event.target;
        let pos = button.getAttribute('pos');

        if (this.state.selectedSlot != pos)
            this.setState({slots: this.state.slots, selectedSlot: pos, bookingDone: false, msg: ''});
    }

    confirmButton() {
        let self = this;

        let selectedSlot = this.state.selectedSlot;
        axios.post('/bookAppointment', {doctor_id: this.doctor_id, start_time: this.state.slots[selectedSlot].startTime, end_time: this.state.slots[selectedSlot].endTime})
            .then(function ({data}) {
                if (data.success){
                    self.setState({slots: self.state.slots, selectedSlot: self.state.selectedSlot, bookingDone: true, msg: 'Your appointment has been booked succesfully. Please track the status of your booking at the appointments page'});
                } else {
                    self.setState({slots: self.state.slots, selectedSlot: self.state.selectedSlot, bookingDone: true, msg: 'Something went wrong'});
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }
}

function mapStateToProps({doctorsList}) {
    return {doctorsList};
}

export default connect(mapStateToProps)(BookingModal);