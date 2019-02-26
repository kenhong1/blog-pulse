'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    name: DataTypes.STRING
  }, {});
  author.associate = function(models) {
    models.author.hasMany(models.post); 
    // associations can be defined here
    // models has many 
  };
  return author;
};