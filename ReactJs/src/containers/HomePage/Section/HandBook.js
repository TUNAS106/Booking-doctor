import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import handbookImg from "../../../assets/specialty/co-xuong-khop.jpg";
import "../HomePage.scss"; // dùng chung scss tối ưu

class HandBook extends Component {
    render() {
        const handbooks = [
            { id: 1, name: "Tư vấn khám bệnh từ xa qua video", img: handbookImg },
            { id: 2, name: "Cách phòng tránh bệnh theo mùa", img: handbookImg },
            { id: 3, name: "Hướng dẫn chăm sóc trẻ nhỏ", img: handbookImg },
            { id: 4, name: "Dinh dưỡng hợp lý cho người cao tuổi", img: handbookImg },
            { id: 5, name: "Các bước sơ cứu cơ bản", img: handbookImg },
            { id: 6, name: "Cẩm nang sức khỏe gia đình", img: handbookImg },
        ];

        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.handbook" defaultMessage="Cẩm nang sức khỏe" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-info" defaultMessage="Xem thêm" />
                        </button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {handbooks.map((item) => (
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

export default connect(mapStateToProps)(HandBook);
