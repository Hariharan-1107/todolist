const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const todoSchema=new Schema({
    task:String
});

const todo = model('todo', todoSchema);
export default todo;
