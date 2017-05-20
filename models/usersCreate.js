module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    "userName"        : DataTypes.STRING,
    "teamName"        : DataTypes.STRING,
    "score"           : DataTypes.INTEGER,
    "Q1"              : DataTypes.INTEGER,
    "Q2"              : DataTypes.INTEGER,
    "Q3"              : DataTypes.INTEGER,
    "Q4"              : DataTypes.INTEGER,
    "Q5"              : DataTypes.INTEGER,
    "Q6"              : DataTypes.INTEGER,
    "Q7"              : DataTypes.INTEGER,
    "Q8"              : DataTypes.INTEGER,
    "Q9"              : DataTypes.INTEGER,
    "Q10"             : DataTypes.INTEGER,

  }
  );
  return User;
};
