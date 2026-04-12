export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    UNAUTHORIZED: 'Unauthorized access',
    TOKEN_REQUIRED: 'Authentication token required',
    TOKEN_INVALID: 'Invalid or expired token',
  },
  USER: {
    NOT_FOUND: 'User not found',
    EMAIL_EXISTS: 'Email already exists',
    USERNAME_EXISTS: 'Username already exists',
  },
} as const;