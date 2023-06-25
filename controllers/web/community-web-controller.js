const User = require("./../../models/mysql-models/user-model");
module.exports = {
  home: async (req, res) => {
    let users = await User.findAll();
    users = users.map((x) => x.dataValues);

    res.render("community/home", { title: "kodKampus Gemenskap", users });
  },
};
