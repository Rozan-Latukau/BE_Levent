const mongoose = require("mongoose");

const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "nama harus diisi"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      require: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("Talent", talentSchema);
