import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSession } from "../../contexts/SessionContext"
import { ProtectedRoutes } from "../../utils/app-routes"

function AppGuard() {
  const {
    loading,
    loggedIn,
    shouldAuthenticate = true,
    onLogout,
  } = useSession()
  const location = useLocation()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && !loggedIn && ProtectedRoutes.includes(location.pathname)) {
    return <Navigate to="/login" />
  }

  return (
    <>
      {shouldAuthenticate ? (
        <>
          <p>Code from App Guard</p>
          {loggedIn ? (
            <>
              <h1>Logged in already</h1>
              <button onClick={onLogout}>Logout user</button>
            </>
          ) : (
            <hr />
          )}
        </>
      ) : null}
      <p>Code from Router outlet</p>
      <Outlet />
    </>
  )
}

export default AppGuard
