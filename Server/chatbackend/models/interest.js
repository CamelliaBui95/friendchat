const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const categorySchema = new mongoose.Schema({
    label: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
    }
})

const interestSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
    },
    category: {type: Schema.Types.ObjectId, ref: "Category"}
});

const Interest = mongoose.model("Interest", interestSchema);
const Category = mongoose.model("Category", categorySchema);


module.exports = { Interest, Category };