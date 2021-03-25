const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    faculty: {
        type: String
    },
    institute: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean
    },
    employment: {
        type: Boolean
    },
    industryPartner: {
        type: {
            name: String,
            website: String,
            text: String
        }
    },
    tags: {
        type: [String]
    },
    languages: {
        type: String,
        required: true
    },
    suitableStudies: {
        type: [String]
    },
    publishedDate: {
        type: String,
        required: true
    },
    lastEditedDate: {
        type: String,
        required: true
    },
    contact1: {
        type: String,
        required: true
    },
    contact2: {
        type: String
    },
    contact3: {
        type: String
    },
    contact4: {
        type: String
    },
    contact5: {
        type: String
    },
    visible: {
        type: Boolean
    },
    assigned: {
        type: Boolean,
    },
    specialField: {
        type: String
    },
    availableAsOfDate: {
        type: String
    }
});

EntrySchema.set('collection', 'entries');

module.exports = Entry = mongoose.model('entry', EntrySchema);
