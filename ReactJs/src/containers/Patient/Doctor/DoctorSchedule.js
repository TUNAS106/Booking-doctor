import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import { path } from '../../../utils';
import moment from 'moment';
import 'moment/locale/vi'; // import locale tiếng Việt
import { LANGUAGES } from '../../../utils';
import { getScheduleByDateFromApi } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = await this.getArrDays(this.props.language);
        if (allDays && allDays.length > 0) {
            let res = await getScheduleByDateFromApi(this.props.doctorIdFromParent, allDays[0].value);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                });
            } else {
                this.setState({
                    allAvailableTime: []
                });
            }
            this.setState({ allDays });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let arrDays = await this.getArrDays(this.props.language);
            this.setState({ allDays: arrDays });
        }
    }

    // Hàm viết hoa chữ cái đầu
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Tạo mảng ngày trong tuần (7 ngày tới)
    getArrDays = async (language) => {
        let arrDays = [];
        moment.locale('vi');
        for (let i = 0; i < 7; i++) {
            let object = {};
            let date = moment(new Date()).add(i, 'days');
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    object.label = `Hôm nay - ${date.format('DD/MM')}`;
                } else {
                    let label = date.format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(label);
                }
            } else {
                if (i === 0) {
                    object.label = `Today - ${date.format('DD/MM')}`;
                } else {
                    object.label = date.locale('en').format('ddd - DD/MM');
                }
            }

            // Lưu timestamp của ngày (để dùng khi gửi API)
            object.value = date.startOf('day').valueOf();
            arrDays.push(object);
        }

        return arrDays;
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            console.log('check date select', date, doctorId);
            let res = await getScheduleByDateFromApi(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                });
            } else {
                this.setState({
                    allAvailableTime: []
                });
            }

        }
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        });
    }
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <div className='text-calendar'>
                            <i className="fas fa-calendar-alt"></i>
                            <span><FormattedMessage id="patient.detail-doctor.select-day" /></span>
                        </div>

                        <select
                            onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                );
                            })}
                        </select>
                        <div className="all-available-time">
                            <div className='text-available-time'>
                                <i className="fas fa-clock"></i>
                                <span><FormattedMessage id="patient.detail-doctor.available" /></span>
                            </div>
                            <div className='time-content'>
                                {allAvailableTime && allAvailableTime.length > 0 && allAvailableTime.map((item, index) => {
                                    let timeDisplay = item.timeTypeData && language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData && language === LANGUAGES.EN ? item.timeTypeData.valueEn : '';
                                    return (
                                        <button key={index} className='btn-time'
                                            onClick={() => this.setState({ isOpenModalBooking: true, dataScheduleTimeModal: item })}
                                        >{timeDisplay}</button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpen={this.state.isOpenModalBooking}
                    dataTime={this.state.dataScheduleTimeModal}
                    toggleFromParent={() => this.setState({ isOpenModalBooking: false })}
                    closeBookingModal={this.closeBookingModal}
                />
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
