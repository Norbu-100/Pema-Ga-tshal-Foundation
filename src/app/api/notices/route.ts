import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notices);
  } catch (error) {
    console.error("[API_NOTICES_GET]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch notices" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Validation Error", message: "Title and content are required" },
        { status: 400 }
      );
    }

    const notice = await prisma.notice.create({
      data: { title, content },
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    console.error("[API_NOTICES_POST]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to create notice" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Validation Error", message: "Notice ID is required" },
        { status: 400 }
      );
    }

    await prisma.notice.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API_NOTICES_DELETE]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to delete notice" },
      { status: 500 }
    );
  }
}
