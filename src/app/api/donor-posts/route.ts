import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    const posts = await (prisma as any).donorPost.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[API_DONOR_POSTS_GET]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch donor posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const donorName = formData.get("donorName") as string;
    const giftTitle = formData.get("giftTitle") as string;
    const amountRaw = formData.get("amount") as string;
    const message = (formData.get("message") as string) || undefined;
    const country = (formData.get("country") as string) || undefined;
    const photoFile = formData.get("photo") as File | null;
    let photoUrl = (formData.get("photoUrl") as string) || undefined;

    const amount = parseFloat(amountRaw);

    if (!donorName || !giftTitle || isNaN(amount)) {
      return NextResponse.json(
        { error: "Validation Error", message: "Missing required fields or invalid amount" },
        { status: 400 }
      );
    }

    if (photoFile && photoFile.size > 0) {
      try {
        photoUrl = await uploadImage(photoFile, "donors");
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        throw new Error("Failed to upload donor photo");
      }
    }

    const post = await (prisma as any).donorPost.create({
      data: { donorName, giftTitle, amount, message, country, photoUrl },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("[API_DONOR_POSTS_POST]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to create donor post" },
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
    await (prisma as any).donorPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API_DONOR_POSTS_DELETE]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to delete post" },
      { status: 500 }
    );
  }
}
