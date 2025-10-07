import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';




const mdParser = new MarkdownIt(/* Markdown-it options */);




class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctors: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === 'vi' ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: dataSelect
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            });
        }
    }



    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    };

    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
        });
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    }
    render() {
        //const { contentMarkdown, contentHTML, selectedDoctor, description } = this.state;
        console.log('check state', this.state);
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <h1>Manage Doctor</h1>
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder="Chọn bác sĩ"

                        />
                    </div>
                    <div className="content-right form-group">
                        <label>Thông tin giới thiệu</label>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.setState({ description: event.target.value })}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button className="btn btn-primary mt-3"
                    onClick={() => this.handleSaveContentMarkdown()}
                >Save Info</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUserStart(userId)),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
