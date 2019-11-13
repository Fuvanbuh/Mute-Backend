const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: String,
  paragraph: [{ type: String }],
  questions: [{ 
    question: String, 
    answer1: String, 
    answer2: String, 
    answer3:String, 
    correct: { type: String, enum: [answer1, answer2, answer3]}
  }],
  theme: [{ type: Schema.Types.ObjectId, ref: "Theme" }],
  creator: { type: Boolean, default:false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;