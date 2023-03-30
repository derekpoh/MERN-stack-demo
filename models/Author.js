const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: { 
        type: String,
        maxLength: 100, 
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Author', authorSchema);