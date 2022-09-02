'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tablename: 'Users',
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'blogPost' });
  };

  return User;
};