const User = require("./../../models/mysql-models/user-model");
const bcrypt = require("bcrypt");

module.exports = {
  home: async (req, res) => {
    if (req.user) {
      return res.redirect("/profile");
    }
    res.render("login/home", { title: "Logga in coh regetera" });
  },
  registerUser: async (req, res) => {
    const username = req.body.username;
    const existingUser = await User.findOne({ where: { username } });
    //om exestingUSer finns
    if (existingUser) {
      req.session.flash = {
        type: "danger",
        massage: "Username already exists",
      };
      res.redirect("/login");
    }
    const password = req.body.password;
    const confirmPassword = req.body["confirm-password"];
    if (password !== confirmPassword) {
      req.session.flash = {
        type: "danger",
        massage: "Password doens not match",
      };
      return res.redirect("/login");
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ username, passwordHash });
    if (user) {
      req.session.flash = { type: "success", massage: "User rceated" };
    }
    res.redirect("/login");
  },
  loginUser: async (req, res) => {
    req.session.flash = { type: "success", massage: "Du har loggad in" };
    res.redirect("/profile");
  },
};
