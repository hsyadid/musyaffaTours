import mongoose, { Schema } from "mongoose";

const PaketSchema = new Schema({
    bulan: {
        type: String,
        required: true
    },
    gambar: {
        type: String,
        required: true,
    },
    harga: {
        type: Number,
        required: true
    },
    durasi: {
        type: Number,
        required: true
    },
    tanggal: {
        type: String,
        required: true
    },
    selesai: {
        type: Boolean,
        required: true
    }
});

const Paket = mongoose.models.Paket || mongoose.model('Paket', PaketSchema);

export default Paket