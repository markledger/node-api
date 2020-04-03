const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");
const LoginError = require("../Exceptions/LoginException");
const mongoosePaginate = require("mongoose-paginate");
const BaseSchema = require("./BaseSchema");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "can't be blank"],
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true }
);

class Recipe extends BaseSchema {
  static fillable = ["name", "owner"];
  static withRelationships = ["owner"];

  constructor() {
    super();
    console.log("sorting by", this.sortBy);
    this.sortBy.concat(["name:asc", "name:desc"]);
  }
}

schema.plugin(mongoosePaginate);

schema.plugin(uniqueValidator, { message: "is already taken" });
schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });
schema.loadClass(Recipe);
mongoose.model("Recipe", schema);
