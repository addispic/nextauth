
// ui
// sign up form
import SignupForm from "./ui/signup-form";
import { logout } from "./actions/auth";

// lib
// session
// get session
import { getSession } from "./lib/session";

export default async function Home() {
  
  const session = await getSession();
  if (session?.username) {
    return <main>
      <p>{session.username}</p>
      <form action={logout}>
        <button type="submit" className="px-3 py-1.5 border border-neutral-300 rounded-md">logout</button>
      </form>
    </main>
  }
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <SignupForm />
    </div>
  );
}
