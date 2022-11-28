const router = require("express").Router();
const { User, Review, Movie, Tag } = require("../models");
const withAuth = require("../utils/auth");
// const { move } = require("./api");

router.get("/", async (req, res) => {
    // req.session.logged_in = true  //remove before production
  try {
    const movieData = await Movie.findAll({
      include: [
        {
          model: Review,
          attributes: ["description", "rating"],
        },
        {
          model: Tag,
          attributes: ["tag_name"],
        },
      ],
    });
    res.render('homepage');
    // const movies = movieData.map((movie) => movie.get({ plain: true }));
    // res.render("homepage", {
    //   movies,
    //   //login?
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/movie/:id", async (req, res) => {
  try {
    const movieData = await Movie.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          attributes: ["description", "rating"],
        },
        {
          model: Tag,
          attributes: ["tag_name"],
        },
      ],
    });
    const movie = movieData.get({ plain: true });
    res.render("movie", {
      ...movie,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Review }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
