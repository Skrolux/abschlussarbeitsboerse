const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// get all user profiles
router.get('/', async(req, res) => { // readd auth
    try {
        const users = await User.find({}).exec();
        console.log('Users were retrieved! ' + new Date(Date.now()));
        if (!users[0]) res.status(404).send('No users found')
        else res.status(200).send(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/emp', async(req, res) => {
    try {
        let emps = await User.find({ group: "ak" }).exec();
        if (!emps) res.send('No employees found');
        else res.status(200).send(emps);
    } catch (err) {
        console.error (err.message);
        res.status(500).send('Server Error');
    }
});

// post route for getting one specific user profile
router.post('/', async(req, res) => {
    try {
        if (req.body.author) {
            const group = req.body.author.replace(/[0-9]/g, '');
            const matnr = req.body.author.replace(/[a-z]/gi, '');
            const user = await User.find({ group: group, matnr: matnr }).exec();
            console.log('User was retrieved! ' + new Date(Date.now()));
            if (!user[0]) res.status(404).send('No such user found')
            else res.status(200).send(user);
        } else {
            res.status(404).send('No user given')
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;