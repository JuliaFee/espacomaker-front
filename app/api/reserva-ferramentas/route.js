import { NextResponse } from "next/server";

import axios from "axios";

const url = process.env.BASE_URL + "/reserva-ferramentas";

export async function GET() {
    try {
        const response = await axios.get(url);
        return NextResponse.json(response.data);
    } catch (error) {
        console.log("[ORDER_GET]", error);
        return new NextResponse("Erro interno do servidor!", { status: 500 });
    }
}