const router = require('express').Router();
const bcrypt = require("bcryptjs")

const Users = require("../auth/auth-model")
const generateToken = require("./generateToken");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to create the user", err })
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message:  `Welcome ${user.username}`,
          token,
        });
      } else  {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to login", err})
    })
});

module.exports = router;
