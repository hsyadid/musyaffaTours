import { connectMongoDB } from "../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Paket from "../../../../models/paket";

export async function GET() {
    try {
        // Pastikan koneksi ke database
        if (!global.mongooseConnection) {
            global.mongooseConnection = await connectMongoDB();
        }

        // Ambil data dengan limit agar tidak memberatkan server
        const allPaket = await Paket.find().limit(50).select("-sensitiveField"); // Hapus field sensitif jika ada

        // Buat response JSON
        const response = NextResponse.json({
            message: "Berhasil mengambil paket",
            data: allPaket,
        });

        // Hindari cache agar data selalu fresh
        response.headers.append("Cache-Control", "no-store");

        return response;
    } catch (error) {
        console.error("Error fetching paket:", error);
        return NextResponse.json({ message: "Gagal mengambil paket", error: error.message }, { status: 500 });
    }
}
