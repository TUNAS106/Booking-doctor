import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_Actions } from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { CommonUtils } from '../../../utils';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',

            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: CRUD_Actions.CREATE
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].key : ''
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].key : ''
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].key : ''
            });
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: this.props.genderRedux?.[0]?.key || '',
                position: this.props.positionRedux?.[0]?.key || '',
                role: this.props.roleRedux?.[0]?.key || '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_Actions.CREATE,
            });
        }
    }

    handleImageChange = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let ObjectURL = URL.createObjectURL(file);

            this.setState({
                previewImgURL: ObjectURL,
                avatar: base64
            });
        }
    }

    checkValidInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.position,
            role: user.role,
            avatar: imageBase64,
            previewImgURL: imageBase64,

            action: CRUD_Actions.EDIT,
            userId: user.id

        });
    }

    handleSaveUser = async () => {
        let isValid = this.checkValidInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_Actions.EDIT) {
            // edit user
            await this.props.editUserRedux({
                id: this.state.userId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                roleId: this.state.role,
                positionId: this.state.position,
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            });
            setTimeout(() => {
                this.props.fetchAllUsersRedux();
            }, 1000);
        }
        else {
            // create user
            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                avatar: this.state.avatar
            });

            setTimeout(() => {
                this.props.fetchAllUsersRedux();
            }, 1000);
        }
        // Reset preview image after save or edit
        this.setState({ previewImgURL: '' });
    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;

        return (

            <div className="user-redux-container">
                <div className="title">
                    User Redux
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    disabled={this.state.action === CRUD_Actions.EDIT}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    disabled={this.state.action === CRUD_Actions.EDIT}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type="text" value={firstName} onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type="text" value={lastName} onChange={(event) => this.onChangeInput(event, 'lastName')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className="form-control" type="text" value={phoneNumber} onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" value={address} onChange={(event) => this.onChangeInput(event, 'address')} />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control" value={gender} onChange={(event) => this.onChangeInput(event, 'gender')}>
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control" value={role} onChange={(event) => this.onChangeInput(event, 'role')}>
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control" value={position} onChange={(event) => this.onChangeInput(event, 'position')}>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input
                                        className="form-control-file"
                                        type="file"
                                        id='image'
                                        hidden
                                        onChange={(event) => this.handleImageChange(event)}
                                    />
                                    <label htmlFor='image' className='btn-upload'>
                                        Tải ảnh <i className="fas fa-upload"></i>
                                    </label>

                                    <div
                                        className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.setState({ isOpen: true })}
                                    ></div>

                                    {this.state.isOpen && (
                                        <Lightbox
                                            mainSrc={this.state.previewImgURL}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button className={`btn btn-${this.state.action === CRUD_Actions.CREATE ? 'primary' : 'warning'}`} onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_Actions.CREATE ?
                                        <FormattedMessage id="manage-user.save" />
                                        :
                                        <FormattedMessage id="manage-user.edit" />
                                    }
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
