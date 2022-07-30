const successResponse = (data, clientMessage, devMessage) => {
  return {
    success: true,
    data,
    clientMessage,
    devMessage,
  };
};

const errorResponse = (data, clientMessage, devMessage) => {
  return {
    success: false,
    data,
    clientMessage,
    devMessage,
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
