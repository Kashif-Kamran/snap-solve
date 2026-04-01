/**
 * Common database types and interfaces shared across microservices
 */

export type SortDirection = 'ASC' | 'DESC';

export interface DatabaseRuntimeConfig {
  url: string;
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  ssl: boolean;
  synchronize: boolean;
  logging: boolean;
  migrationsRun: boolean;
  maxConnections: number;
  connectionTimeoutMs: number;
  idleTimeoutMs: number;
  appName: string;
}

/**
 * Base entity interface for all database entities
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Pagination input for list queries
 */
export interface PaginationInput {
  page: number;
  limit: number;
  offset?: number;
}

/**
 * Pagination metadata for responses
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Generic query filter options
 */
export interface QueryOptions {
  where?: Record<string, unknown>;
  skip?: number;
  take?: number;
  order?: Record<string, SortDirection>;
  relations?: string[];
}

/**
 * Database operation result
 */
export interface OperationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

/**
 * Audit fields for entities
 */
export interface AuditFields {
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}
