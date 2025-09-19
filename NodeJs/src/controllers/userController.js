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

export default { handleLogin, handleGetAllUsers };