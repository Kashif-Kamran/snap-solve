import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProblemStatus } from '@app/shared';

@Entity({ name: 'problem' })
export class Problem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
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
  runningLogs: Record<string, any> | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
