const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
  checkpoint: [{ type: String}],
  background: String,
  price: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Theme = mongoose.model('User', themeSchema);

module.exports = Theme;