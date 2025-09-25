import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";

class Specialty extends Component {
    render() {
        const specialties = [
            { id: 1, name: "Cơ xương khớp 1", img: specialtyImg },
            { id: 2, name: "Bệnh viện Chợ Rẫy 2", img: specialtyImg },
            { id: 3, name: "Bệnh viện Chợ Rẫy 3", img: specialtyImg },
            { id: 4, name: "Bệnh viện Chợ Rẫy 4", img: specialtyImg },
            { id: 5, name: "Bệnh viện Chợ Rẫy 5", img: specialtyImg },
            { id: 6, name: "Bệnh viện FV", img: specialtyImg },
        ];

        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.specialty-popular" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>

                    <div className="specialty-body">
                        <Slider {...settings}>
                            {specialties.map((item) => (
                                <div className="specialty-item" key={item.id}>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="img-specialty"
                                    />
                                    <div className="text-specialty">{item.name}</div>
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

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
