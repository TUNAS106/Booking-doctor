import db from "../models/index";
import bcrypt from 'bcryptjs';

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

export default { handleUserLogin, getAllUsers };