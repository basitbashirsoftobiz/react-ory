import React, { useState } from "react"
import Kratos from "../../services/kratosService"
import {
  getCsrfFromFlowData,
  getVerificationCodeFromFlowData,
} from "../../utils/helper-function"

const RECOVERY_METHODS = {
  CODE: "code",
  LINK: "link",
}

function Recovery() {
  const [flow, setFlow] = useState(null)
  const [code, setCode] = useState(null)
  async function onRecovery() {
    console.log(flow)
    if (flow == null) {
      console.log("executing")
      const recoveryFlow = await Kratos.generateBrowserRecoveryFlow()
      const email = "basit376@yopmail.com"
      const csrfToken = getCsrfFromFlowData(recoveryFlow)

      const body = {
        email: email,
        csrf_token: csrfToken,
        method: RECOVERY_METHODS.CODE,
      }

      try {
        const response = await Kratos.completeRecoveryFlow(
          recoveryFlow.id,
          body
        )
        setFlow(response)
        alert(`Successfully sent recovery link to your email: ${email}`)
      } catch (e) {
        console.log(e?.message)
        alert(`Failed to send the recovery link to your email: ${email}`)
      }
    } else {
      const csrfToken = getCsrfFromFlowData(flow)
      const body = {
        csrf_token: csrfToken,
        code,
      }
      try {
        const response = await Kratos.completeRecoveryFlow(flow.id, body)
        console.log(response)
      } catch (e) {
        console.log(e, e?.message)
      }
    }
  }
  return (
    <div>
      <button onClick={onRecovery}>Recovery</button>
      {flow && (
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      )}
    </div>
  )
}

export default Recovery
