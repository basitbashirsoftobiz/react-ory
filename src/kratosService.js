import axios from "axios"
// import { FrontendApi } from "@ory/kratos-client"

// const api = new FrontendApi(
//   {
//     basePath: "http://192.168.1.6:4433",
//   },
//   axios.create({
//     headers: {
//       withCredentials: true,
//     },
//   })
// )

// api.createBrowserRegistrationFlow().then((res) => {
//   const id = res.data.id
//   console.log(res, id)

//   api
//     .getRegistrationFlow({
//       id,
//     })
//     .then((res) => {
//       console.log(res)
//     })
//     .catch((e) => {
//       console.log(e.message)
//     })
// })

class KratosService {
  constructor() {
    this.$http = axios.create({
      baseURL: "http://192.168.1.6:4433/",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  async generateRegistrationFlow() {
    const response = await this.$http.get("/self-service/registration/browser")
    return response.data
  }

  async submitRegistrationFlow(flowId, body) {
    try {
      const response = await this.$http.post(
        `/self-service/registration/flows?id=${flowId}`,
        body
      )
      return response.data
    } catch (e) {
      console.log(e?.response?.data)
    }
  }

  async getRegistrationFlowFromFlowId(flowId) {
    try {
      const response = await this.$http.get(
        `/self-service/registration/flows?id=${flowId}`
      )
      return response.data
    } catch (e) {
      console.log(e?.response?.data)
    }
  }

  async generateLoginFlow() {
    const response = await this.$http.get("/self-service/login/browser")
    return response.data
  }

  async getLoginFlowFromFlowId(flowId) {
    const response = await this.$http.get(
      `/self-service/login/flows?id=${flowId}`
    )
    return response.data
  }

  async getLogoutFlow() {}

  async getLogoutFlowFromId() {}
}

const KratosServiceInstance = new KratosService()
export default KratosServiceInstance
