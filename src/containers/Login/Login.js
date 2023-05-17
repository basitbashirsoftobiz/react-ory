import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useSession } from "../../contexts/SessionContext"
import Kratos from "../../services/kratosService"
import { getCsrfFromFlowData } from "../../utils/helper-function"

function Login() {
  const { loading, loggedIn } = useSession()
  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>
  }

  if (loggedIn) {
    return <Navigate to="/dashboard" />
  }

  async function onLogin() {
    const flow = await Kratos.generateBrowserLoginFlow()
    const csrfToken = getCsrfFromFlowData(flow)

    const body = {
      csrf_token: csrfToken,
      identifier: "basit793@yopmail.com",
      password: "Bated@123",
      method: "password",
    }

    try {
      await Kratos.completeLoginFlow(flow.id, body)
      navigate("/dashboard")
    } catch (e) {
      alert(`Failed to login because of: ${e.message}`)
      console.log(e)
    }
  }

  return (
    <>
      {loggedIn ? (
        <h1>Logged in already</h1>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </>
  )
}

export default Login
