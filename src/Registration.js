import React, { useEffect, useMemo, useRef, useState } from "react"
import KratosService from "./kratosService"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  // const location = useLocation()
  // const flowId = useMemo(
  //   () => new URLSearchParams(location.search).get("flow"),
  //   [location.search]
  // )
  // const [csrf, setCsrf] = useState(null)

  const [flowId, setFlowId] = useState(null)
  const [csrfToken, setCsrfToken] = useState(null)
  const isMounted = useRef(false)

  async function getFlow() {
    const flowData = await KratosService.generateRegistrationFlow()
    // const flowData = await fetch(
    //   "http://192.168.1.6:4433/self-service/registration/browser",
    //   {
    //     method: "GET",
    //     mode: "cors",
    //     headers: {
    //       Accept: "application/json",
    //     },

    //     credentials: "include",
    //   }
    // )
    //   .then(async (res) => {
    //     // if (res.status >= 400) {
    //     //   const data = await res.json()
    //     //   throw data
    //     // }
    //     return res.json()
    //   })
    //   .then((data) => data)
    //   .catch((err) => {
    //     console.log(err)
    //   })

    // console.log(flowData)
    const csrfTokenData = flowData.ui.nodes.find(
      (node) => node.attributes.name === "csrf_token"
    )

    setFlowId(flowData.id)
    navigate(`/registration?flow=${flowData.id}`)
    setCsrfToken(csrfTokenData.attributes.value)
  }
  console.log("mounted")

  useEffect(() => {
    if (!flowId && !isMounted.current) {
      getFlow()

      isMounted.current = true
    }
  }, [])

  const handleClick = async () => {
    const body = {
      csrf_token: csrfToken,
      "traits.email": "basit22@yopmail.com",
      password: "Bated@123",
      "traits.username": "basitowaisi23",
      "traits.name.first": "Basit",
      "traits.name.last": "Bashir",
      "traits.corporate.companyName": "Softobiz",
      "traits.country.countryName": "India",
      method: "password",
    }

    // const response = await axios.post(
    //   `http://192.168.1.6:4433/self-service/registration?flow=${flowId}`,
    //   body,
    //   {
    //     withCredentials: true,
    //     headers: {
    //       "Content-Type": "application/json",
    //       // "Content-Type": "application/x-www-form-urlencoded",
    //       Accept: "application/json",
    //     },
    //   }
    // )
    const response = await KratosService.submitRegistrationFlow(flowId, body)
    console.log(response)
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
