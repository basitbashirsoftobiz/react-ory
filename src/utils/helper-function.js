export const getCsrfFromFlowData = (flowData) =>
  flowData?.ui?.nodes?.find((node) => node.attributes.name === "csrf_token")
    ?.attributes?.value

export const getVerificationCodeFromFlowData = (flowData) =>
  flowData?.ui?.nodes?.find((node) => node.attributes.name === "code")
    ?.attributes?.value
