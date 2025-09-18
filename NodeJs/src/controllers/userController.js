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

export default { handleLogin };