import axios from "axios"

class KratosService {
  constructor() {
    this.$http = axios.create({
      baseURL: "http://localhost:4433/",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  async generateBrowserRegistrationFlow() {
    const response = await this.$http.get("/self-service/registration/browser")
    return response.data
  }

  async submitRegistrationFlow(flowId, body) {
    const response = await this.$http.post(
      `/self-service/registration?flow=${flowId}`,

      body
    )

    return response.data
  }
  async whomAmI() {
    const response = await this.$http.get(`/sessions/whoami`)
    return response.data
  }

  async generateBrowserLoginFlow() {
    const response = await this.$http.get("/self-service/login/browser")
    return response.data
  }

  async generateBrowserRecoveryFlow() {
    const respons = await this.$http.get("/self-service/recovery/browser")
    return respons.data
  }

  async completeRecoveryFlow(flowId, body) {
    const response = await this.$http.post(
      `/self-service/recovery?flow=${flowId}`,
      body
    )
    return response.data
  }

  async getLogoutFlow() {
    const response = await this.$http.get("/self-service/logout/browser")
    return response.data
  }

  async completeLoginFlow(flowId, body) {
    const response = await this.$http.post(
      `/self-service/login?flow=${flowId}`,
      body
    )
    return response.data
  }
}

const Kratos = new KratosService()
export default Kratos
