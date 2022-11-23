const User = require('./User');
const Review = require('./Review');
const Movie = require('./Movie');
const Tag = require('./Tags');

User.hasMany(Review, {
    foreignKey: 'user_id',
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Movie.hasMany(Review, {
    foreignKey: 'movie_id',
    onDelete: 'CASCADE'
});

Movie.hasMany(Tag, {
    foreignKey: 'movie_id'
});

Review.belongsTo(Movie, {
    foreignKey: 'movie_id'
})
module.exports = { User, Review, Movie, Tag}