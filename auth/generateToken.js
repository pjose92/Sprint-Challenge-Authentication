const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets")

function generateToken(user) {
    const payload = {
        username: user.username,
        subject: user.id,
    };
    const options = {
        expiresIn: "1h",
    }

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = generateToken;