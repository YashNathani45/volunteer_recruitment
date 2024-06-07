const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
    },
    timeCommitment: {
        type: String,
    },
    note: {
        type: String,
    },
    appliedOpportunities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity', // Reference to Opportunity model
    }],
});

const Volunteer = mongoose.model('Volunteer', VolunteerSchema);
module.exports = Volunteer;
