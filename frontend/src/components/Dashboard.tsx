// src/components/Dashboard.tsx
import { useSession } from "../lib/auth-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !session) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <img src={session.user.image || ""} alt="Profile" />
      <p>Email: {session.user.email}</p>
      <p>ID: {session.user.id}</p>
    </div>
  );
}
