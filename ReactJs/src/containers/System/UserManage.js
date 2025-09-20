import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserToApi, deleteUserFromApi, editUserFromApi } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };

    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let res = await getAllUsers('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                arrUsers: res.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toogleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toogleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let res = await createNewUserToApi(data);
            if (res && res.errCode !== 0) {
                alert(res.message);
            }
            else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA'); // Clear data in modal
            }
        } catch (error) {
            console.error('Error creating new user:', error);
        }
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    handleDeleteUser = async (user) => {
        try {
            await deleteUserFromApi(user.id);
            this.getAllUsersFromReact();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserFromApi(user);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false,
                })

            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    }

    render() {
        console.log('check state', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toogleUserModal}
                    className={'modal-user-container'}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toogleUserEditModal}
                        className={'modal-user-container'}
                        currentUser={this.state.userEdit}

                        editUser={this.doEditUser}
                    />}
                <div className="title text-center">
                    User Manage
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        }



                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
