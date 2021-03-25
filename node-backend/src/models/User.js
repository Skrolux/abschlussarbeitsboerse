const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true
    },
    cat: {
        type: String,
        required: true
    },
    permissions: {
        type: [String]
    },
    studies: {
        type: [String]
    },
    matnr: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    title_pre: {
        type: String
    },
    title_aft: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    room: {
        type: String
    },
    dial: {
        type: String
    },
    phone: {
        type: String
    },
    fax: {
        type: String
    },
    mobile: {
        type: String
    },
    website: {
        type: String
    }
});

UserSchema.index({ group: 1, matnr: 1 }, { unique: true });
UserSchema.set('collection', 'users');

module.exports = User = mongoose.model('user', UserSchema);
