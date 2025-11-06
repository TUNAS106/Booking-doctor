
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import React, { Component } from 'react';
import './ProfileDoctor.scss';
import { getProfileDoctorByIdFromApi } from "../../../services/userService";
import moment from "moment";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            isShowDescriptionDoctor: this.props.isShowDescriptionDoctor,
            dataTime: this.props.dataTime
        };
    }

    async componentDidMount() {
        let { doctorId } = this.props;
        if (doctorId) {
            this.getInfoDoctor(doctorId);
        }
    }

    getInfoDoctor = async (doctorId) => {
        let res = await getProfileDoctorByIdFromApi(doctorId);
        if (res && res.errCode === 0) {
            this.setState({
                dataProfile: res.data
            })
        }

    }

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInfoDoctor(this.props.doctorId);
        }
    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && Object.keys(dataTime).length > 0) {
            let { language } = this.props;
            let time = language === 'vi' ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = moment.unix(+dataTime.date / 1000).format(language === 'vi' ? 'dddd - DD/MM/YYYY' : 'ddd - MM/DD/YYYY');
            return (
                <div className='time-booking'>
                    <div className='time'>
                        <span><FormattedMessage id="patient.booking-modal.time" />: {time}</span>
                    </div>
                    <div className='date'>
                        <span><FormattedMessage id="patient.booking-modal.date" />: {date}</span>
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.free-booking" />
                    </div>
                </div>
            );
        }
    }





    render() {
        console.log('check state profile doctor', this.state);
        let { dataProfile, isShowDescriptionDoctor, dataTime } = this.state;
        let nameVi = '', nameEn = '';
        let { language } = this.props;
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} - ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn} - ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'>
                        <img className='image-doctor' src={dataProfile?.image || ''} alt='doctor' />
                    </div>

                    <div className='content-right'>
                        <div className='up'>
                            {language === 'vi' ? nameVi : nameEn}
                        </div>

                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>{dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }

                        </div>
                    </div>
                </div>

                <div className='content-bottom'>
                    <div className='price'>
                        <FormattedMessage id="patient.booking-modal.price" />:&nbsp;
                        {language === 'vi' && dataProfile?.doctorInfoData?.priceData?.valueVi && (
                            <span>{dataProfile.doctorInfoData.priceData.valueVi} VND</span>
                        )}
                        {language === 'en' && dataProfile?.doctorInfoData?.priceData?.valueEn && (
                            <span>{dataProfile.doctorInfoData.priceData.valueEn} USD</span>
                        )}
                    </div>
                </div>
            </div>


        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(ProfileDoctor);
