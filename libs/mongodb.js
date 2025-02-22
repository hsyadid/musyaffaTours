import mongoose from "mongoose";

let isConnected = false;

const connectMongoDB = async () => {
    if (isConnected) {
        console.log("Sudah terhubung ke MongoDB.");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, { 
            connectTimeoutMS: 30000 
        });
        isConnected = true;
        console.log("Koneksi ke MongoDB berhasil.");
    } catch (error) {
        console.error("Koneksi ke MongoDB gagal:", error);
    }
}

const disconnectMongoDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.error("Gagal menutup koneksi ke MongoDB:", error);
    }
}

export {connectMongoDB, disconnectMongoDB}