
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import _ from 'lodash';
import { postBookAppointmentFromApi } from '../../../../services/userService';
import { toast } from 'react-toastify';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: null,
            genders: [],
            note: '',
            doctorId: '',
            timeType: '',
        };
    }

    async componentDidMount() {
        this.props.fetchGenderStart();

    }

    buildDataGender = (data) => {
        console.log('check build data gender111', data);
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        console.log('check build data gender222', result);
        return result;

    }

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux) || [],
            });
        }
        if (this.props.genderRedux !== prevProps.genderRedux) {
            console.log('check genderRedux', this.props.genderRedux);
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux) || [],
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataTime.timeType
                });
            }

        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleConfirmBooking = async () => {
        let { fullName, phoneNumber, email, address, reason, birthday, selectedGender, note, doctorId, timeType } = this.state;
        // Validate input fields
        if (!fullName || !phoneNumber || !email || !address || !reason || !birthday || !selectedGender || !note || !doctorId || !timeType) {
            alert("Please fill in all fields");
            return;
        }
        // Call API to book appointment
        console.log('Booking appointment with data:', {
            fullName,
            phoneNumber,
            email,
            address,
            reason,
            birthday,
            selectedGender,
            note,
            doctorId,
            timeType,
            date: this.props.dataTime.date
        });
        let res = await postBookAppointmentFromApi({
            fullName,
            phoneNumber,
            email,
            address,
            reason,
            birthday,
            selectedGender,
            note,
            doctorId,
            timeType,
            date: this.props.dataTime.date
        });
        if (res && res.errCode === 0) {
            toast.success("Booking successful!");
            this.props.closeBookingModal();
        } else {
            toast.error("Booking failed. Please try again.");
        }
    }



    render() {
        let { isOpen, toggleFromParent, closeBookingModal, dataTime } = this.props;

        return (

            <Modal
                isOpen={isOpen}
                toggle={() => { toggleFromParent() }}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title"><FormattedMessage id="patient.booking-modal.title" /></h5>
                    <button type="button" className="close" aria-label="Close" onClick={() => { this.props.toggleFromParent() }}>
                        <span aria-hidden="true"
                            onClick={closeBookingModal}
                        >&times;</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={dataTime.doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className="price">

                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.fullname" /></label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.phone-number" /></label>
                                <input className="form-control" type="text"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className="form-control" type="email"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className="form-control" type="text"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className="col-12 form-group">
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className="form-control" type="text"
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')} />
                            </div>
                            <div className="col-12 form-group">
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    onChange={(date) => { this.setState({ birthday: date[0] }) }}
                                    className="form-control"
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={(selectedOption) => this.setState({ selectedGender: selectedOption })}
                                    options={this.state.genders}
                                    classNamePrefix="select"
                                    className="react-select-container"

                                />
                            </div>
                            <div className="col-12 form-group">
                                <label><FormattedMessage id="patient.booking-modal.note" /></label>
                                <textarea className="form-control" rows="4"
                                    value={this.state.note}
                                    onChange={(event) => this.handleOnChangeInput(event, 'note')}></textarea>
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleConfirmBooking() }}><FormattedMessage id="patient.booking-modal.btn-confirm" /></Button>{' '}
                    <Button color="secondary" onClick={() => { toggleFromParent() }}><FormattedMessage id="patient.booking-modal.btn-cancel" /></Button>
                </ModalFooter>
            </Modal >
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    genderRedux: state.admin.genders,
});

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
