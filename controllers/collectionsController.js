const Collection = require("../models/Collection");
require("../models/Author");   //-> remove line 2 after creating authors controller

const show = async (req, res) => {
  try {
    const book = await Collection.findById(req.params.id).populate("author")
    res.status(200).send(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { show };