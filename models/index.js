const User = require('./user');
const Review = require('./review');
const Movie = require('./movie');
const Tag = require('./tags');

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