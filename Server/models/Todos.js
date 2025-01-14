const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodosSchema = new Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
    },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    default: null 
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todos', TodosSchema);
