import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  async function handleLogout(e) {
    await logout();
  }
  return (
    <div className="mt-auto ">
      {!loading ? (
        <BiLogOut
          className="w-10 h-10 p-2 rounded-full hover:bg-sky-500 text-white cursor-pointer"
          onClick={handleLogout}
        />
      ) : (
        <span className="loading loading-spinner loading-lg"></span>
      )}
    </div>
  );
};

export default LogoutButton;
