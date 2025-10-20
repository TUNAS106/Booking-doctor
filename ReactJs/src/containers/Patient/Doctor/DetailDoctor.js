import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { path } from '../../../utils';
import { getDetailDoctorByIdFromApi } from '../../../services/userService';
import DoctorSchedule from './DoctorSchedule';


class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: this.props.match.params.id,
            detailDoctor: {}
        };
    }
    async componentDidMount() {

        let res = await getDetailDoctorByIdFromApi(this.props.match.params.id);
        if (res && res.errCode === 0) {
            this.setState({
                detailDoctor: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) { }

    render() {

        let nameVi = '', nameEn = '';
        let { language } = this.props;
        let { detailDoctor } = this.state;
        console.log('check state detail doctor', detailDoctor);
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} - ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn} - ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <React.Fragment>
                <HomeHeader />
                <div className="detail-doctor-container">
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <img className='image-doctor' src={this.state.detailDoctor && this.state.detailDoctor.image ? this.state.detailDoctor.image : ''} />
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === 'vi' ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor && Array.isArray(detailDoctor.markdownData) && detailDoctor.markdownData.length > 0 ?
                                    <span>
                                        {detailDoctor.markdownData[detailDoctor.markdownData.length - 1].description}
                                    </span>
                                    : <span>Không có mô tả</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={this.state.doctorId}
                            />
                        </div>
                        <div className='content-right'>
                            <button className='btn-booking'>Đặt lịch khám</button>
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && Array.isArray(detailDoctor.markdownData) && detailDoctor.markdownData.length > 0 && detailDoctor.markdownData[detailDoctor.markdownData.length - 1].contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.markdownData[detailDoctor.markdownData.length - 1].contentHTML }}>
                            </div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
                    <div className='like-doctor'></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
