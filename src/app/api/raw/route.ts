import { codeModel } from "@/Utils/Mongoose";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key: string | null = searchParams.get("key");
  const code = await codeModel.findOne({ key: key!.toLowerCase() });
  return new Response(code.code, {
    status: 200,
  });
}
