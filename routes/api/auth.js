const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

router.get('/', auth, async (req, res) =>  {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post('/', [
    check('email', "Email invalid").isEmail(),
    check('password', "Password required").exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [ { msg: "Username or password invalid" } ] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [ { msg: "Invalid username or password" } ] });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 3600000 },
            (err, token) => {
                if (err) {
                    throw(err);
                } else {
                    res.json({ token });
                }
            }
        ); 
    
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

module.exports = router;