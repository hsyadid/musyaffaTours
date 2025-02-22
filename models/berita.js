import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
    date: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
});

const Berita = mongoose.models.Berita || mongoose.model("Berita", articleSchema);

export default Berita;


