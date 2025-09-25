import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import "./HomePage.scss"; // dùng chung scss tối ưu

class HomeFooter extends Component {
    render() {


        return (
            <div className="home-footer">
                <p>&copy; 2024 Hỏi dân IT. More information, please visit our website.</p>
                <p>Contact: 0123456789</p>
                <p>Email: tranvana@example.com</p>
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

export default connect(mapStateToProps)(HomeFooter);
