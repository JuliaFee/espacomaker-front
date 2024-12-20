import axios from "axios";
import { NextResponse } from "next/server";

// URL da API para manipulação de ferramentas e reservas
const url = process.env.BASE_URL + "/adm";

// Obter ferramentas
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await axios.get(`${url}/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[ORDER_GET]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

// Atualizar reserva
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    const response = await axios.put(`${url}/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[ORDER_PUT]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

// Deletar reserva
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const response = await axios.delete(`${url}/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[ORDER_DELETE]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}
