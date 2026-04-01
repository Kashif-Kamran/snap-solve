import { Column, Entity } from 'typeorm';
import {
  DATABASE_CONSTRAINTS,
  DATABASE_TABLES,
  ProblemStatus,
} from '@app/shared';
import { AppBaseEntity } from './base.entity';

@Entity({ name: DATABASE_TABLES.PROBLEM })
export class Problem extends AppBaseEntity {
  @Column({ type: 'varchar', length: DATABASE_CONSTRAINTS.LANGUAGE_MAX_LENGTH })
  language: string;

  @Column({ type: 'text' })
  code: string;

  @Column({
    type: 'enum',
    enum: ProblemStatus,
    default: ProblemStatus.PENDING,
  })
  status: ProblemStatus;

  @Column({ type: 'jsonb', nullable: true })
  runningLogs: Record<string, unknown> | null;
}
