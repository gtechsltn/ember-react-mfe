/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

const navigateToHostRoute = ({ route }: { route: string }) => {
  return parent.postMessage(
    { type: "navigateToHost", payload: { route } },
    window.location.origin
  );
};

const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleListener = (event: any) => {
      const { data } = event;
      if (data.type === "navigateToAdminMfeHome") {
        navigate("/admin");
      }
    };
    window.addEventListener("message", handleListener);
    return () => window.removeEventListener("message", handleListener);
  }, [navigate]);

  return <Outlet />;
};

export const generateRouter = (options = {}) =>
  createBrowserRouter(
    [
      {
        path: "/",
        element: <RootPage />,
        children: [
          { index: true, element: <Navigate to="/admin" /> },
          {
            path: "/admin",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: (
                  <section>
                    <div>Admin page rendered from react</div>
                    <NavLink to="/admin/groups">Groups</NavLink>
                  </section>
                ),
              },
              {
                path: "groups",
                element: (
                  <section>
                    <div>Groups page rendered from react</div>
                    <button
                      onClick={() =>
                        navigateToHostRoute({ route: "/dashboard" })
                      }
                    >
                      Navigate to host app dashboard
                    </button>
                  </section>
                ),
              },
            ],
          },
        ],
      },
    ],
    options
  );
