import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import './ManageSchedule.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { bulkCreateScheduleFromApi } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: []
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.doctors !== this.props.doctors || prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.doctors);

            this.setState({
                listDoctors: dataSelect
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {


            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            this.setState({
                rangeTime: data
            });
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.forEach(item => {
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                result.push({
                    label: language === LANGUAGES.VI ? labelVi : labelEn,
                    value: item.id
                });
            });
        }

        return result;
    }

    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    }

    handelButtonTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    // Tạo object mới, copy item cũ và toggle isSelected
                    return { ...item, isSelected: !item.isSelected };
                }
                return item; // các item khác giữ nguyên
            });

            this.setState({
                rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;

        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        }
        if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor!");
            return;
        }

        if (rangeTime && (!rangeTime.length || rangeTime.every(item => item.isSelected === false))) {
            toast.error("Invalid selected time!");
            return;
        }

        let formattedDate = new Date(currentDate);
        formattedDate.setHours(0, 0, 0, 0);
        formattedDate = formattedDate.getTime();

        // Filter out the selected time slots
        let selectedTime = rangeTime.filter(item => item.isSelected === true);
        if (selectedTime && selectedTime.length > 0) {
            selectedTime.forEach(item => {
                let obj = {
                    doctorId: selectedDoctor.value,
                    date: '' + formattedDate,
                    timeType: item.keyMap
                };
                result.push(obj);
            });
        }
        let res = await bulkCreateScheduleFromApi({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        });
        console.log("Schedule to save: ", result);
    };


    render() {
        const { listDoctors, selectedDoctor } = this.state;
        let { language } = this.props;


        return (
            <div className='manage-schedule-container'>
                <div className='ms-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.select-doctor" /></label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={listDoctors}
                                placeholder={<FormattedMessage id="manage-schedule.select-doctor" />}
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.select-date" /></label>
                            <DatePicker
                                onChange={(date) => { this.setState({ currentDate: date[0] }) }}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date().setHours(0, 0, 0, 0)}
                            />
                        </div>

                        <div className='col-12 pick-hour-container'>
                            <label><FormattedMessage id="manage-schedule.select-time" /></label>
                            <div className='pick-hour-content'>
                                {this.state.rangeTime && this.state.rangeTime.length > 0 &&
                                    this.state.rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={`btn btn-schedule ${item.isSelected ? 'active' : ''}`}
                                                key={index}
                                                onClick={() => this.handelButtonTime(item)}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='col-12'>
                            <button className='btn btn-primary'
                                onClick={() => { this.handleSaveSchedule() }}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        doctors: state.admin.allDoctors,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

