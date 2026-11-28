
import mongoose, { Schema, models, model } from "mongoose";

const FAQSchema = new Schema(
  {
    pertanyaan: {
      type: String,
      required: true,
    },
    jawaban: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    aktif: {
      type: Boolean,
      default: true,
    },
    urutan: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "faq",
  }
);

const FAQ = models.FAQ || model("FAQ", FAQSchema);

export default FAQ;
