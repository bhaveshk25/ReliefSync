export function getApiErrorMessage(error, fallbackMessage) {
  const responseData = error?.response?.data;

  if (responseData?.message && responseData?.details) {
    const detailMessage = Object.values(responseData.details).join(", ");
    return detailMessage ? `${responseData.message}: ${detailMessage}` : responseData.message;
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (error?.message) {
    return error.message;
  }

  return fallbackMessage;
}
