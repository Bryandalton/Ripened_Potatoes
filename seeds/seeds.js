const sequelize = require("../config/connection");
const { User, Movie, Review, Tag } = require("../models");

const userData = require("./userData.json");
const movieData = require("./movieData.json");
// const reviewData = require();
const tagData = require("./tagData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Tag.bulkCreate(tagData, {
    individualHooks: true,
    returning: true,
  });
  await Movie.bulkCreate(movieData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
