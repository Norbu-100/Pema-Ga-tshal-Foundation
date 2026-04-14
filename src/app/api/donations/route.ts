import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const donations = await (prisma as any).donation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(donations);
  } catch (error) {
    console.error("[API_DONATIONS_GET]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const donorName = formData.get("donorName") as string;
    const address = formData.get("address") as string;
    const country = formData.get("country") as string;
    const phone = formData.get("phone") as string;
    const giftTitle = formData.get("giftTitle") as string;
    const goalPerUnitRaw = formData.get("goalPerUnit") as string;
    const numberOfStudentsRaw = formData.get("numberOfStudents") as string;
    const totalAmountRaw = formData.get("totalAmount") as string;

    const qrScreenshot = formData.get("qrScreenshot") as File | null;
    const donorPhoto = formData.get("donorPhoto") as File | null;

    if (!donorName || !address || !country || !phone || !giftTitle) {
      return NextResponse.json(
        { error: "Validation Error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    const goalPerUnit = parseFloat(goalPerUnitRaw);
    const numberOfStudents = parseInt(numberOfStudentsRaw, 10);
    const totalAmount = parseFloat(totalAmountRaw);

    if (isNaN(goalPerUnit) || isNaN(numberOfStudents) || isNaN(totalAmount)) {
      return NextResponse.json(
        { error: "Validation Error", message: "Invalid numeric fields" },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    async function saveFile(file: File): Promise<string> {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const filePath = path.join(uploadsDir, uniqueName);
        await writeFile(filePath, buffer);
        return `/uploads/${uniqueName}`;
      } catch (err) {
        console.error("File save error:", err);
        throw new Error("Failed to save uploaded file");
      }
    }

    let qrScreenshotUrl: string | undefined;
    let donorPhotoUrl: string | undefined;

    if (qrScreenshot && qrScreenshot.size > 0) qrScreenshotUrl = await saveFile(qrScreenshot);
    if (donorPhoto && donorPhoto.size > 0) donorPhotoUrl = await saveFile(donorPhoto);

    const donation = await (prisma as any).donation.create({
      data: {
        donorName,
        address,
        country,
        phone,
        giftTitle,
        goalPerUnit,
        numberOfStudents,
        totalAmount,
        qrScreenshotUrl,
        donorPhotoUrl,
        status: "pending"
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error("[API_DONATIONS_POST]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to submit donation" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, adminNote } = await req.json();
    if (!id || !status) {
      return NextResponse.json(
        { error: "Validation Error", message: "Missing id or status" },
        { status: 400 }
      );
    }
    const updated = await (prisma as any).donation.update({
      where: { id },
      data: { status, adminNote }
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("[API_DONATIONS_PATCH]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to update donation" },
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
        { error: "Validation Error", message: "Missing id" },
        { status: 400 }
      );
    }
    await (prisma as any).donation.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API_DONATIONS_DELETE]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to delete donation" },
      { status: 500 }
    );
  }
}
