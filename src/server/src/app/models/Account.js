const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Account = new Schema({
  id: {type: String, require: true},
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true},
}, {
  timestamps: true,
});

module.exports = mongoose.model("Account", Course);