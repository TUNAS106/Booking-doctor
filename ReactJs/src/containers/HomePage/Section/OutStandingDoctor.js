import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import doctorImg from "../../../assets/specialty/co-xuong-khop.jpg"; // bạn thay ảnh thật vào
import "../HomePage.scss";

class OutstandingDoctor extends Component {
    render() {
        const doctors = [
            { id: 1, name: "BS. Trần Văn A", img: doctorImg, specialty: "Cơ xương khớp" },
            { id: 2, name: "BS. Nguyễn Thị B", img: doctorImg, specialty: "Tim mạch" },
            { id: 3, name: "BS. Lê Văn C", img: doctorImg, specialty: "Tiêu hóa" },
            { id: 4, name: "BS. Phạm Thị D", img: doctorImg, specialty: "Da liễu" },
            { id: 5, name: "BS. Trương Văn E", img: doctorImg, specialty: "Nội tiết" },
            { id: 6, name: "BS. Hoàng Thị F", img: doctorImg, specialty: "Sản khoa" },
        ];

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
                            {doctors.map((item) => (
                                <div className="section-item" key={item.id}>
                                    <div className="doctor-card">
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="img-section"
                                        />
                                        <div className="text-section">
                                            <div className="doctor-name">{item.name}</div>
                                            <div className="doctor-specialty">{item.specialty}</div>
                                        </div>
                                    </div>
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

export default connect(mapStateToProps)(OutstandingDoctor);
