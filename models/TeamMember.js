// models/TeamMember.js

const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  NAME: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  updatedImageUrl: {
    type: String,
    required: true,
  },
});
mongoose.models = {}
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
