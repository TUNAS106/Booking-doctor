import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllUsersRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.users !== this.props.users) {
            this.setState({ usersRedux: this.props.users });
        }
    }

    handleEditUser = (user) => {
        //console.log("Edit user:", user);
        this.props.handleEditUserFromParentKey(user);
        // TODO: mở modal hoặc gọi props từ UserRedux
    };

    handleDeleteUser = (userId) => {
        this.props.deleteUserRedux(userId);

    };

    render() {
        const { usersRedux } = this.state;

        return (
            <div className="table-manage-user-container">
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersRedux && usersRedux.length > 0 &&
                            usersRedux.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUserStart(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
