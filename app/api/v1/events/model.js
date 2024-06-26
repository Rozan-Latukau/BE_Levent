const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const ticketCategoriesSchema = Schema({
  type: {
    type: String,
    required: [true, "Tipe tiket harus diisi"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

const eventSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Judul harus diisi"],
      minlength: 2,
      maxlength: 100,
    },
    date: {
      type: Date,
      required: [true, "Tanggal harus diisi"],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, "Tagline harus diisi"],
    },
    venueName: {
      type: String,
      required: [true, "Nama tempat harus diisi"],
    },
    keyPoint: {
      type: [String],
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    statusEvent: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: "Talent",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
