import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../../utils';

import doctorImg from "../../../assets/specialty/co-xuong-khop.jpg"; // bạn thay ảnh thật vào
import "../HomePage.scss";
import * as actions from "../../../store/actions";

class OutstandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }
    render() {
        let { arrDoctors } = this.state;
        console.log('arrDoctors', arrDoctors);
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = doctorImg;
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className="section-item" key={item.id}>
                                            <img
                                                src={imageBase64}
                                                alt={item.firstName + ' ' + item.lastName}
                                                className="img-section-doctor"
                                            />
                                            <div className="text-section">
                                                <div className="doctor-name">{item.firstName} {item.lastName}</div>
                                                <div className="doctor-specialty">{item.specialty}</div>
                                                <div className="doctor-position">
                                                    {this.props.language === 'vi'
                                                        ? item.positionData?.valueVi
                                                        : item.positionData?.valueEn}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctors: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctorHome()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
