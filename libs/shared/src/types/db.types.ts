/**
 * Common database types and interfaces shared across microservices
 */

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
  where?: Record<string, any>;
  skip?: number;
  take?: number;
  order?: Record<string, 'ASC' | 'DESC'>;
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
