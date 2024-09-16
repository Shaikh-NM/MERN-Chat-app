import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  async function logout() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "applicatoin/json" },
      });
      const data = res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { loading, logout };
};
