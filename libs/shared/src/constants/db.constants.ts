/**
 * Database constants and enums shared across all microservices
 */

/**
 * Problem status enum
 * Represents the lifecycle of a problem execution
 */
export enum ProblemStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

/**
 * User identity provider types
 * Supported OAuth and authentication providers
 */
export enum ProviderType {
  GITHUB = 'GITHUB',
  GOOGLE = 'GOOGLE',
  LOCAL = 'LOCAL',
}

/**
 * Database table names
 * Constants for table names to maintain consistency across queries
 */
export const DATABASE_TABLES = {
  USER_IDENTITY: 'user_identity',
  PROBLEM: 'problem',
  NOTIFICATION: 'notification',
} as const;

/**
 * Database column length constraints
 * Used for consistent varchar field definitions across entities
 */
export const DATABASE_CONSTRAINTS = {
  LANGUAGE_MAX_LENGTH: 100,
  PROVIDER_MAX_LENGTH: 50,
  PROVIDER_USER_ID_MAX_LENGTH: 255,
  EMAIL_MAX_LENGTH: 320,
  UUID_LENGTH: 36,
} as const;

/**
 * Problem status values for type safety
 */
export const PROBLEM_STATUS_VALUES = [
  ProblemStatus.PENDING,
  ProblemStatus.RUNNING,
  ProblemStatus.COMPLETED,
  ProblemStatus.FAILED,
] as const;

/**
 * Provider type values for type safety
 */
export const PROVIDER_TYPE_VALUES = [
  ProviderType.GITHUB,
  ProviderType.GOOGLE,
  ProviderType.LOCAL,
] as const;

/**
 * Default pagination limits
 */
export const PAGINATION_DEFAULTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

/**
 * Query timeout in milliseconds
 */
export const QUERY_TIMEOUT_MS = 30000;

/**
 * Database connection retry configuration
 */
export const DB_RETRY_CONFIG = {
  ATTEMPTS: 3,
  DELAY: 1000,
} as const;
