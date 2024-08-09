const sequelize = require('../config/database');
const User = require('./User');
const Task = require('./Task');

const initModels = async () => {
  await sequelize.sync();
};

module.exports = { initModels, User, Task };
