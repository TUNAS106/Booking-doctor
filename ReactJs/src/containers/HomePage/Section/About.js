import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AboutImg from "../../../assets/specialty/co-xuong-khop.jpg";
import "../HomePage.scss"; // dùng chung scss tối ưu

class About extends Component {
    render() {


        return (
            <div className="section-share section-About">
                <div className="section-about-header">
                    <FormattedMessage id="homepage.About" defaultMessage="Về chúng tôi" />
                </div>

                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            src="https://www.youtube.com/embed/-njb__c9Y2M?list=RD-njb__c9Y2M"
                            title="[Lyrics+vietsub] The Nights - Avicii ( Cover by AngieN.) || Piano Version"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="content-right">
                        <p>
                            Booking Doctor là nền tảng y tế trực tuyến hàng đầu tại Việt Nam, cung cấp dịch vụ tư vấn sức khỏe từ xa, đặt lịch khám bệnh và quản lý hồ sơ y tế cá nhân.
                            Với đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm và hệ thống công nghệ tiên tiến, chúng tôi cam kết mang đến cho người dùng trải nghiệm chăm sóc sức khỏe tiện lợi, nhanh chóng và an toàn.
                            Sứ mệnh của Hỏi dân IT là cải thiện chất lượng cuộc sống thông qua việc cung cấp dịch vụ y tế chất lượng cao, giúp mọi người dễ dàng tiếp cận và quản lý sức khỏe của mình mọi lúc, mọi nơi.
                        </p>
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

export default connect(mapStateToProps)(About);
