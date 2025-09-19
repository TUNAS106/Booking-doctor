import e from 'express';
import userService from '../services/userServices';
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            message: "Missing inputs parameter!"
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        email: email,
        // Không trả về password!
        user: userData.user // nếu muốn trả về thông tin user (không có password)
    });
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // All, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        });
    }
    console.log(id);
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: "OK",
        users
    });
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        });
    }
    let userId = req.body.id;
    let message = await userService.deleteUser(userId);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}

export default { handleLogin, handleGetAllUsers, handleCreateNewUser, handleDeleteUser, handleEditUser };