import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const nextPath = typeof sp.next === "string" ? sp.next : "/admin/projects/new";

  async function login(formData: FormData) {
    "use server";
    const pw = String(formData.get("password") ?? "");
    if (pw === process.env.ADMIN_PASSWORD) {
      cookies().set("admin", "1", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
      redirect(nextPath);
    }
    throw new Error("Invalid password");
  }

  return (
    <main className="container py-5" style={{ maxWidth: 420 }}>
      <h1 className="h4 mb-3">Admin sign in</h1>
      <form action={login} className="vstack gap-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Admin password"
          required
        />
        <button className="btn btn-primary">Sign in</button>
      </form>
    </main>
  );
}
