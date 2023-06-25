const UserLearningPathModel = require("./../../models/mongodb-models/user-learning-path-model");

module.exports = {
  completeStep: async (req, res) => {
    const { pathId, stepId, done } = req.body;
    const userId = req.user.userId;
    const userLearningPath = await UserLearningPathModel.findOne({ userId });
    const learningPath = userLearningPath.learningPaths.find(
      (x) => x._id == pathId
    );
    const step = learningPath.learningPath.steps.find((x) => x._id == stepId); // Fix: Use square brackets here
    step.done = done;
    await userLearningPath.save();
    res.sendStatus(200);
  },
};
