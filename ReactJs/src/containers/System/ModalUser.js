import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './UserManage.scss';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={this.props.className}
                size='lg'

            >
                <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email' />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' />
                        </div>

                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text' />
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text' />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-2' onClick={() => this.toggle()}>
                        Save
                    </Button>
                    <Button color="secondary" className='px-2' onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



