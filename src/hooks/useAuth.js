import React, { useState, useEffect, useCallback } from "react"
import KratosService from "../services/kratosService"
import { useLocation } from "react-router-dom"
import Kratos from "../services/kratosService"

function useAuth() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  const authenticate = useCallback(async () => {
    setLoading(true)
    try {
      await KratosService.whomAmI()
      setLoggedIn(true)
    } catch (e) {
      setLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    authenticate()
  }, [location.pathname, authenticate])

  const onLogout = useCallback(async () => {
    const response = await Kratos.getLogoutFlow()
    const logoutUrl = response.logout_url
      .replace(":4455", ":4433")
      .replace("/.ory/kratos/public", "")
    sessionStorage.clear()
    window.open(logoutUrl, "_self")
  }, [])

  return {
    loading,
    loggedIn,
    onLogout,
  }
}

export default useAuth
