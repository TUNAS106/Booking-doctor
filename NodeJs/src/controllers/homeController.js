import { render } from "ejs";
import db from "../models/index.js";
import CRUDService from "../services/CRUDServices.js";
const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('-----------------------')
        console.log(data)
        console.log('-----------------------')
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }

};
const getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

const postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send(message);
};
const displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    console.log('-----------------------')
    console.log(data)
    console.log('-----------------------')
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
};

const getEditCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let userData = await CRUDService.getUserInfoById(id);
        return res.render("editCRUD.ejs", {
            user: userData
        });
    }
}

const putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data); // chỉ cập nhật, không lấy danh sách
    let allUsers = await CRUDService.getAllUsers(); // lấy lại danh sách user
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers
    });
}
const deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.render("displayCRUD.ejs", {
            dataTable: await CRUDService.getAllUsers()
        });
    } else {
        return res.send("User not found");
    }
}

export default { getHomePage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD, deleteCRUD };