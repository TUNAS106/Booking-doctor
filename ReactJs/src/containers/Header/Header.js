import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        };
    }
    componentDidMount() {
        let { userInfo } = this.props;
        if (userInfo && userInfo.roleId === 'R1') {
            this.setState({
                menuApp: adminMenu
            })
        } else if (userInfo && userInfo.roleId === 'R2') {
            this.setState({
                menuApp: doctorMenu
            })
        }


    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        const { processLogout, language, userInfo } = this.props;
        //console.log('check userInfo: ', userInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="language">
                    <span className="welcome">
                        {language === LANGUAGES.VI ? 'Xin chào' : 'Welcome'}
                        {userInfo && userInfo.firstName ? ` ${userInfo.firstName}` : 'USER'}!
                    </span>
                    <span className={`language-vi ${language === LANGUAGES.VI ? 'active' : ''}`} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={`language-en ${language === LANGUAGES.EN ? 'active' : ''}`} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
