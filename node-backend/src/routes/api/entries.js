const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongodb = require('mongodb');

const Entry = require('../../models/Entry');
const { collection } = require('../../models/Entry');

// get all entries saved in database
router.get('/', async (req, res) => { // readd auth
    try {
        if (req.query._id) {
            const entry = await Entry.find({ _id: req.query._id }).exec();
            console.log('Entry ' + req.query._id + ' was retrieved! ' + new Date(Date.now()));
            if (!entry) res.status(404).send('No such entry found');
            else res.send(entry);

        } else if (req.query.author) {
            const entries = await Entry.find({ author: req.query.author }).exec();
            console.log('Entries of author ' + req.query.author + ' were retrieved! ' + new Date(Date.now()));
            if (!entries) res.status(404).send('No such entries found')
            else res.send(entries);

        } else {
            const entries = await Entry.find({}).exec();
            console.log('Entries were retrieved! ' + new Date(Date.now()));
            if (!entries) res.status(404).send('No entries found')
            else res.send(entries);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// get all bachelor entries saved in database
router.get('/bac', async (req, res) => { // readd auth
    try {
        // maybe add .limit() when database has a certain amount of entries
        const entries = await Entry.find({ type: 'Bachelorarbeit' }).exec();
        console.log('Entries were retrieved! ' + new Date(Date.now()));
        if (!entries) res.status(404).send('No entries found')
        else res.send(entries);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error2');
    }
});

//get all master entries saved in database
router.get('/mas', async (req, res) => { // readd auth
    try {
        // maybe add .limit() when database has a certain amount of entries
        const entries = await Entry.find({ type: 'Masterarbeit' }).exec();
        console.log('Entries were retrieved! ' + new Date(Date.now()));
        if (!entries) res.status(404).send('No entries found')
        else res.send(entries);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error3');
    }
});

//get all diplom entries saved in database
router.get('/dip', async (req, res) => { // readd auth
    try {
        // maybe add .limit() when database has a certain amount of entries
        const entries = await Entry.find({ type: 'Diplomarbeit' }).exec();
        console.log('Entries were retrieved! ' + new Date(Date.now()));
        if (!entries) res.status(404).send('No entries found')
        else res.send(entries);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error3');
    }
});

//get all diplom entries saved in database
router.get('/dis', async (req, res) => { // readd auth
    try {
        // maybe add .limit() when database has a certain amount of entries
        const entries = await Entry.find({ type: 'Dissertation' }).exec();
        console.log('Entries were retrieved! ' + new Date(Date.now()));
        if (!entries) res.status(404).send('No entries found')
        else res.send(entries);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error3');
    }
});

// save a new entry into database
router.post('/', async (req, res) => { // readd auth
    try {
        const newEntry = new Entry(req.body);
        await newEntry.save();
        console.log('New entry saved into database! ' + new Date(Date.now()));
        res.status(201).send('Entry created');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/', async (req, res) => { // readd auth
    try {
        console.log(req.body);

        const entry = req.body.entry;
        const entryToChangeId = req.body.entryId;

        const filter = { _id: entryToChangeId };
        
        await Entry.replaceOne(filter, entry);

        res.status(200).send('Entry updated')
        console.log('Entry '+entryToChangeId+' was updated!'+ new Date(Date.now()));

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// delete an entry from database
router.delete('/', async (req, res) => { //readd auth
    try {
        if (req.query._id) {
            await Entry.deleteOne({ _id: new mongodb.ObjectID(req.query._id) });
            console.log('Entry ' + req.query._id + ' was deleted from database! ' + new Date(Date.now()));
            res.status(200);
        } else {
            res.status(404).send('No such entry found')
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;