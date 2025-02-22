import { connectMongoDB } from "../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Berita from "../../../../models/berita";

export async function GET() {
    try {
        if (!global.mongooseConnection) {
            global.mongooseConnection = await connectMongoDB();
        }

        const allBerita = await Berita.find().limit(50).select("-sensitiveField"); 

        const response = NextResponse.json({
            message: "Berhasil mengambil berita",
            data: allBerita,
        });

        // Hindari cache agar data selalu fresh
        response.headers.append("Cache-Control", "no-store");

        return response;
    } catch (error) {
        console.error("Error fetching berita:", error);
        return NextResponse.json({ message: "Gagal mengambil berita", error: error.message }, { status: 500 });
    } 
}