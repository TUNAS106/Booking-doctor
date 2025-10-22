import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailDoctorByIdFromApi } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getDoctorPriceStart();
        this.props.getDoctorPaymentStart();
        this.props.getDoctorProvinceStart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            const dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({ listDoctors: dataSelect });
        }

        if (prevProps.language !== this.props.language) {
            const dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let dataSelectPrice = this.buildDataInputSelect(this.props.allPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(this.props.allPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(this.props.allProvince, 'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            });
        }

        if (prevProps.allPrice !== this.props.allPrice) {
            const dataSelectPrice = this.buildDataInputSelect(this.props.allPrice, 'PRICE');
            this.setState({ listPrice: dataSelectPrice });
        }

        if (prevProps.allPayment !== this.props.allPayment) {
            const dataSelectPayment = this.buildDataInputSelect(this.props.allPayment, 'PAYMENT');
            this.setState({ listPayment: dataSelectPayment });
        }

        if (prevProps.allProvince !== this.props.allProvince) {
            const dataSelectProvince = this.buildDataInputSelect(this.props.allProvince, 'PROVINCE');
            this.setState({ listProvince: dataSelectProvince });
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        const { language } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.map(item => {
                let object = {};
                switch (type) {
                    case 'USERS':
                        object.label =
                            language === 'vi'
                                ? `${item.lastName} ${item.firstName}`
                                : `${item.firstName} ${item.lastName}`;
                        object.value = item.id;
                        break;
                    case 'PRICE':
                        object.label = language === 'vi'
                            ? `${item.valueVi} VND`
                            : `${item.valueEn} USD`;
                        object.value = item.keyMap;
                        break;
                    case 'PAYMENT':
                    case 'PROVINCE':
                        object.label = language === 'vi' ? item.valueVi : item.valueEn;
                        object.value = item.keyMap;
                        break;
                    default:
                        break;
                }
                result.push(object);
            });
        }

        return result;
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleChangeSelect = async selectedDoctor => {
        this.setState({ selectedDoctor });
        let res = await getDetailDoctorByIdFromApi(selectedDoctor.value);

        if (res && res.errCode === 0 && Array.isArray(res.data.markdownData) && res.data.markdownData.length > 0) {
            const lastMarkdown = res.data.markdownData[res.data.markdownData.length - 1];
            this.setState({
                contentMarkdown: lastMarkdown.contentMarkdown || '',
                contentHTML: lastMarkdown.contentHTML || '',
                description: lastMarkdown.description || '',
                hasOldData: true,
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false,
            });
        }
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        console.log('selected option', selectedOption, name);
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        });
    };

    handleSaveContentMarkdown = () => {

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,

            selectedPrice: this.state.selectedPrice ? this.state.selectedPrice.value : '',
            selectedPayment: this.state.selectedPayment ? this.state.selectedPayment.value : '',
            selectedProvince: this.state.selectedProvince ? this.state.selectedProvince.value : '',
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

        });

        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            description: '',
        });
    };

    render() {
        console.log('state', this.state);
        const { hasOldData } = this.state;
        const btnSave = hasOldData
            ? <FormattedMessage id="admin.manage-doctor.update" />
            : <FormattedMessage id="admin.manage-doctor.save" />;
        const btnClass = hasOldData ? 'btn btn-warning mt-3' : 'btn btn-primary mt-3';

        return (
            <div className="manage-doctor-container">
                {/* TITLE */}
                <div className="manage-doctor-title">
                    <h1><FormattedMessage id="admin.manage-doctor.title" /></h1>
                </div>

                {/* BASIC INFO */}
                <div className="more-info">
                    <div className="content-left form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>

                    <div className="content-right form-group">
                        <label><FormattedMessage id="admin.manage-doctor.intro-info" /></label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={e => this.setState({ description: e.target.value })}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>

                {/* EXTRA INFO */}
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedPrice"
                            value={this.state.selectedPrice}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                            value={this.state.selectedPayment}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                            value={this.state.selectedProvince}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input
                            className="form-control"
                            onChange={e => this.setState({ nameClinic: e.target.value })}
                            value={this.state.nameClinic}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                        <input
                            className="form-control"
                            onChange={e => this.setState({ addressClinic: e.target.value })}
                            value={this.state.addressClinic}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input
                            className="form-control"
                            onChange={e => this.setState({ note: e.target.value })}
                            value={this.state.note}
                        />
                    </div>
                </div>

                {/* MARKDOWN EDITOR */}
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                {/* SAVE BUTTON */}
                <button className={btnClass} onClick={this.handleSaveContentMarkdown}>
                    {btnSave}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.admin.users,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allPrice: state.admin.allPrice,
    allPayment: state.admin.allPayment,
    allProvince: state.admin.allProvince,
});

const mapDispatchToProps = dispatch => ({
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    deleteUserRedux: userId => dispatch(actions.deleteUserStart(userId)),
    saveDetailDoctor: data => dispatch(actions.saveDetailDoctor(data)),
    getDoctorPriceStart: () => dispatch(actions.getDoctorPriceStart()),
    getDoctorPaymentStart: () => dispatch(actions.getDoctorPaymentStart()),
    getDoctorProvinceStart: () => dispatch(actions.getDoctorProvinceStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
