import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
    const cookie = Cookie();
    const user = cookie.get("user");
    return (
        <>
            {user.role === "ADMIN" || user.role === "MANAGER" ? (
                <Outlet />
            ) : (
                <Navigate to={"/home"} />
            )}
        </>
    );
}
