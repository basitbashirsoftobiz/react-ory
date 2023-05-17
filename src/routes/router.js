import React, { lazy } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import SessionProvider from "../contexts/SessionContext"
import AppGuard from "../containers/AppGuard/AppGuard"
const Login = lazy(() => import("../containers/Login/Login"))
const Dashboard = lazy(() => import("../containers/Dashboard/Dashboard"))
const Settings = lazy(() => import("../containers/Settings/Settings"))
const Recovery = lazy(() => import("../containers/Recovery/Recovery"))
const Registration = lazy(() =>
  import("../containers/Registration/Registration")
)

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <SessionProvider>
        <AppGuard />
      </SessionProvider>
    ),

    children: [
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/recovery",
        element: <Recovery />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router
