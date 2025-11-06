import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorByIdFromApi } from '../../../services/userService';
import './DoctorExtraInfor.scss';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extraInfor: {},
            isShowDetailInfor: false,
        };
    }

    async componentDidMount() {
        await this.loadDoctorExtraInfor();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            await this.loadDoctorExtraInfor();
        }
    }

    loadDoctorExtraInfor = async () => {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorByIdFromApi(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({ extraInfor: res.data });
            }
        }
    };

    showHideDetailInfor = (status) => {
        this.setState({ isShowDetailInfor: status });
    };

    renderPrice = (price, language) => {
        return price ? (
            <NumberFormat
                className='currency'
                value={price}
                displayType={'text'}
                thousandSeparator={true}
                suffix={language === LANGUAGES.VI ? ' VNĐ' : ' $'}
            />
        ) : (
            <span>—</span>
        );
    };

    render() {
        const { isShowDetailInfor, extraInfor } = this.state;
        const { language } = this.props;

        const nameClinic = extraInfor?.nameClinic || '';
        const addressClinic = extraInfor?.addressClinic || '';
        const note = extraInfor?.note || '';

        const price =
            language === LANGUAGES.VI
                ? extraInfor?.priceData?.valueVi
                : extraInfor?.priceData?.valueEn;

        const payment = extraInfor?.paymentData
            ? (language === LANGUAGES.VI
                ? extraInfor.paymentData.valueVi
                : extraInfor.paymentData.valueEn)
            : '';

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.detail-doctor.address-clinic" />
                    </div>
                    <div className='name-clinic'>{nameClinic}</div>
                    <div className='detail-address'>{addressClinic}</div>
                </div>

                <div className='content-down'>
                    {!isShowDetailInfor ? (
                        <div className='short-infor'>
                            <span className='title-price'>
                                <FormattedMessage id="patient.detail-doctor.price" />:
                            </span>
                            <span className='price'>
                                {this.renderPrice(price, language)}
                                <span
                                    className='show-detail'
                                    onClick={() => this.showHideDetailInfor(true)}
                                >
                                    <FormattedMessage id="patient.detail-doctor.see-detail" defaultMessage="Xem chi tiết" />
                                </span>
                            </span>
                        </div>
                    ) : (
                        <div className='detail-infor'>
                            <div className='title-price'>
                                <FormattedMessage id="patient.detail-doctor.price" />:
                            </div>
                            <div className='price'>
                                {this.renderPrice(price, language)}
                                <span
                                    className='hide-detail'
                                    onClick={() => this.showHideDetailInfor(false)}
                                >
                                    <FormattedMessage id="patient.detail-doctor.hide-detail" defaultMessage="Ẩn thông tin" />
                                </span>
                            </div>

                            {note && (
                                <div className='note'>
                                    <FormattedMessage id="patient.detail-doctor.note" />: {note}
                                </div>
                            )}

                            {payment && (
                                <div className='payment-method'>
                                    <FormattedMessage id="patient.detail-doctor.payment" />: {payment}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(DoctorExtraInfor);
