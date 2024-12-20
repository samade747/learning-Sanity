import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/sanityz/lib/drizzle";

export async function GET(request: NextRequest) {
    try {
        const res = await db.select().from(cartTable);

        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong",
            error,});
      
    }
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const res = await db.insert(cartTable).values(body).returning();
        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong",
            error,
        });
    }
}