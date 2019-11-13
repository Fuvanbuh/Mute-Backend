const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapSchema = new Schema({
  completePath: Number,
  story: [{ type: Schema.Types.ObjectId, ref: "Story" }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Map = mongoose.model('Map', mapSchema);

module.exports = Map;