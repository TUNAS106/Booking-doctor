import db from "../models/index.js";
const getHomePage =  async (req, res) => {
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

export default { getHomePage };