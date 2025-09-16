export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status = 400,
    public details?: unknown
  ) { super(message); }
}
export const badRequest = (msg: string, details?: unknown) =>
  new AppError("BAD_REQUEST", msg, 400, details);
export const internal = (msg = "Internal server error", details?: unknown) =>
  new AppError("INTERNAL", msg, 500, details);
