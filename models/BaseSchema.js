const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const uniqueValidator = require("mongoose-unique-validator");

class BaseSchema {
  static sortBy = [
    "createdAt:desc",
    "createdAt:asc",
    "updatedAt:asc",
    "updatedAt:desc"
  ];

  static fillable = [];
  static withRelationships = [];

  touchUpdatedTimestamp() {
    this.updatedAt = new Date();
  }
}

module.exports = BaseSchema;
