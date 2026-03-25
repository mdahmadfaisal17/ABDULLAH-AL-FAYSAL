import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { AdminDataProvider } from "./context/AdminDataContext";

export default function App() {
  return (
    <AuthProvider>
      <AdminDataProvider>
        <RouterProvider router={router} />
      </AdminDataProvider>
    </AuthProvider>
  );
}
