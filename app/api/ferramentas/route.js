 import { NextResponse } from "next/server";
 import axios from "axios";

 const url = process.env.NEXT_PUBLIC_BASE_URL + "/ferramentas";

 export async function GET() {
     try {
         console.log("Fetching from URL:", url); // Log da URL
         const response = await axios.get(url);
        console.log("Response data:", response.data); // Log da resposta
        return NextResponse.json(response.data);
     } catch (error) {
         console.log("[ORDER_GET]", error.response ? error.response.data : error.message);
       return new NextResponse("Erro interno do servidor!", { status: 500 });
     }
 }

// import { NextResponse } from "next/server";
// import axios from "axios";

// const url = process.env.NEXT_PUBLIC_BASE_URL + "/ferramentas";

// export async function GET(requst) {
//     const { searchParams } = new URL(requst.url);
//     const name = searchParams.get("name");
//     const newURL = name ? `${url}?name=${name}` : url;

//     try {
//         const response = await axios.get(newURL);
//         return NextResponse.json(response.data);
//     } catch (error) {
//         console.log("[ORDER_GET]", error.response ? error.response.data : error.message);
//         return new NextResponse("Erro interno do servidor!", { status: 500 });
//     }
// }
// export async function POST(request) {
//     const body = await request.json();
//     try {
//         const response = await axios.post(url, body);
//         return NextResponse.json(response.data);
//     } catch (error) {
//         console.log("[ORDER_POST]", error.response ? error.response.data : error.message);
//         return new NextResponse("Erro interno do servidor!", { status: 500 });
//     }
// }