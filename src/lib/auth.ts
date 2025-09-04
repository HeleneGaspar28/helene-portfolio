import { cookies } from "next/headers";
export async function assertAdmin() {
  if ((await cookies()).get("admin")?.value !== "1") throw new Error("Unauthorized");
}
