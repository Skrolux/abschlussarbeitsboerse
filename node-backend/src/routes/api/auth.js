const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// authenticate user and get token
router.post(
    '/', [
        check('group', 'Please include a valid group.').exists(),
        check('matnr', 'Please include a valid matriculation number.').exists(),
        check('password', 'Password is required.').exists()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { group, matnr, password } = req.body;

        try {
            let user = await User.findOne({ group, matnr }).exec();

            if (!user) {
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'Invalid Matriculation Number!' }] });
            }

            if (password != user.password) {
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'Invalid Password!' }] });
            }

            const payload = { user };

            jwt.sign(
                payload,
                'key', { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            console.log(err);
            res.status(500).send('Server error');
        }
    }
);

// get user by group and matnr
router.get('/', auth, async(req, res) => {
    const { group, matnr } = req.body;

    try {
        let user = await User.findOne({ group, matnr }).exec();
        if (!user) res.send('No user found');
        else res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;