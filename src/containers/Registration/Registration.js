import React from "react"
import KratosService from "../../services/kratosService"
import { Navigate, useNavigate } from "react-router-dom"
import { useSession } from "../../contexts/SessionContext"
import { getCsrfFromFlowData } from "../../utils/helper-function"

function Register() {
  const navigate = useNavigate()

  const { loading, loggedIn } = useSession()

  if (loading) {
    return <div>Loading...</div>
  }

  if (loggedIn) {
    return <Navigate to="/dashboard" />
  }

  const handleClick = async () => {
    const id = Math.ceil(Math.random() * 1000)
    const flow = await KratosService.generateBrowserRegistrationFlow()

    const csrfToken = getCsrfFromFlowData(flow)

    const body = {
      csrf_token: csrfToken,
      "traits.email": `basit${id}@yopmail.com`,
      password: "Bated@123",
      "traits.username": `basitowaisi${id}`,
      "traits.name.first": "Basit",
      "traits.name.last": "Bashir",
      "traits.corporate.companyName": "Softobiz",
      "traits.country.countryName": "India",
      method: "password",
    }

    try {
      const response = await KratosService.submitRegistrationFlow(flow.id, body)
      const { identity } = response
      sessionStorage.setItem("identity", JSON.stringify(identity.traits))
      navigate("/dashboard")
    } catch (e) {
      console.log(e?.response.data)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

function Registration() {
  return <Register />
}

export default Registration
