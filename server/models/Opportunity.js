const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  lastDayToApply: {
    type: Date,
    required: true,
  },
  hoursPerDay: {
    type: Number,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', // reference to the Teacher model
   
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer', // Reference to Volunteer model
  }],
});

const Opportunity = mongoose.model('Opportunity', OpportunitySchema);
module.exports = Opportunity;
