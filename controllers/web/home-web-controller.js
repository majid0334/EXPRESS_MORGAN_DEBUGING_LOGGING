const LearningPath = require("./../../models/mongodb-models/learning-path-model");
module.exports = {
  home: async (req, res) => {
    const learningPaths = await LearningPath.find().lean();

    res.render("home", { title: "kodKampus", learningPaths });
  },
};
