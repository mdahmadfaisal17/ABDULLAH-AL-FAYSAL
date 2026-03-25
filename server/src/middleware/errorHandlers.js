export function notFoundHandler(request, response) {
  response.status(404).json({
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
}

export function errorHandler(error, _request, response, _next) {
  console.error("Unhandled server error:", error);

  response.status(error.status || 500).json({
    message: error.message || "Internal server error",
  });
}
