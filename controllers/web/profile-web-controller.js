const User = require("./../../models/mysql-models/user-model");
const UserLearningPathModel = require("./../../models/mongodb-models/user-learning-path-model");
const LearningPathModel = require("./../../models/mongodb-models/learning-path-model");
const bcrypt = require("bcrypt");

module.exports = {
  home: async (req, res) => {
    const userId = req.user.userId;
    const userLearningPaths = await UserLearningPathModel.findOne({
      userId,
    }).lean();
    let paths = [];
    if (userLearningPaths) {
      paths = userLearningPaths.learningPaths;
    }

    res.render("profile/home", { title: "Din profil", paths });
  },
  startPath: async (req, res) => {
    const pathId = req.params.id;
    const userId = req.user.userId;
    let userLearningPath = await UserLearningPathModel.findOne({ userId });
    if (!userLearningPath) {
      userLearningPath = await UserLearningPathModel.create({ userId });
    }

    if (
      userLearningPath.learningPaths.find((x) => x.learningPath._id == pathId)
    ) {
      return res.redirect("profile/home", { title: "Din profil" });
    }

    const learningPath = await LearningPathModel.findById(pathId);

    userLearningPath.learningPaths.push({
      learningPath,
      startedAt: new Date(),
    });
    await userLearningPath.save();
    res.redirect("/profile");
  },
};
