import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(team);
  } catch (error) {
    console.error("[API_TEAM_GET]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch team" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const message = formData.get("message") as string;
    const file = formData.get("file") as File | null;

    if (!name || !position || !message) {
      return NextResponse.json(
        { error: "Validation Error", message: "Name, position, and message are required" },
        { status: 400 }
      );
    }

    let photoUrl = null;

    if (file) {
      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueName = `team-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(uploadsDir, uniqueName);
        await writeFile(filePath, buffer);
        photoUrl = `/uploads/${uniqueName}`;
      } catch (err) {
        console.error("File save error:", err);
        throw new Error("Failed to save team member photo");
      }
    }

    const member = await prisma.teamMember.create({
      data: { name, position, message, photoUrl },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("[API_TEAM_POST]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to save team member" },
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
        { error: "Validation Error", message: "Member ID is required" },
        { status: 400 }
      );
    }

    await prisma.teamMember.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API_TEAM_DELETE]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
