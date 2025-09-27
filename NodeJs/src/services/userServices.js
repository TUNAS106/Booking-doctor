import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: { email: email },
                raw: true
            });
            if (user) {
                let check = bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = "Ok";
                    //console.log(user);
                    delete user.password;
                    //console.log(user);
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = "Wrong password";
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your's email isn't exist in your system. Please try other email!";
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
                raw: true
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            } else if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Email is already in use'
                });
                return;
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve({
                errCode: 0,
                message: 'OK'
            });
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: id }
        });
        if (!user) {
            resolve({
                errCode: 2,
                message: "User not found!"
            });
        } else {
            try {
                await db.User.destroy(
                    {
                        where: { id: id }
                    }
                )
                resolve({
                    errCode: 0,
                    message: "Delete user successfully!"
                });
            } catch (e) {
                reject(e);
            }
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.firstName || !data.lastName || !data.address) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters!"
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    message: "User not found!"
                });
            } else {
                await db.User.update({
                    //email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    //phoneNumber: data.phoneNumber,
                    //gender: data.gender === '1' ? true : false,
                    //roleId: data.roleId,
                }, {
                    where: { id: data.id }
                });
                resolve({
                    errCode: 0,
                    message: "Update user successfully!"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                });
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
}

export default { handleUserLogin, getAllUsers, createNewUser, deleteUser, updateUserData, getAllCodeService };