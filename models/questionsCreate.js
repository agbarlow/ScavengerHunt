module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define("Questions", {
    "question"         : DataTypes.STRING,
    "answer1"          : DataTypes.STRING,
    "answer2"          : DataTypes.STRING,
    "answer3"          : DataTypes.STRING,
    "answer4"          : DataTypes.STRING,
    "land"             : DataTypes.STRING,
    "correctAnswer"    : DataTypes.INTEGER,
  }
  );
  return Questions;
};
