import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(photos);
  } catch (error) {
    console.error("[API_PHOTOS_GET]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Validation Error", message: "No file provided" },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadsDir, uniqueName);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${uniqueName}`;

    const photo = await prisma.photo.create({
      data: { url: fileUrl, caption },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error("[API_PHOTOS_POST]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to upload photo" },
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
        { error: "Validation Error", message: "Photo ID is required" },
        { status: 400 }
      );
    }

    await prisma.photo.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API_PHOTOS_DELETE]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
