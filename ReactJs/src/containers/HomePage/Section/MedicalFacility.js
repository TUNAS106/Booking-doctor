import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import facilityImg from "../../../assets/specialty/co-xuong-khop.jpg";
import "../HomePage.scss"; // dùng chung file scss

class MedicalFacility extends Component {
    render() {
        const facilities = [
            { id: 1, name: "Bệnh viện Hữu nghị Việt Đức", img: facilityImg },
            { id: 2, name: "Bệnh viện Bạch Mai", img: facilityImg },
            { id: 3, name: "Bệnh viện Chợ Rẫy", img: facilityImg },
            { id: 4, name: "Bệnh viện Trung ương Huế", img: facilityImg },
            { id: 5, name: "Phòng khám Đa khoa Quốc tế", img: facilityImg },
            { id: 6, name: "Bệnh viện FV", img: facilityImg },
        ];

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-medical-facility" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {facilities.map((item) => (
                                <div className="section-item" key={item.id}>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="img-section"
                                    />
                                    <div className="text-section">{item.name}</div>
                                </div>
                            ))}
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
    };
};

export default connect(mapStateToProps)(MedicalFacility);
