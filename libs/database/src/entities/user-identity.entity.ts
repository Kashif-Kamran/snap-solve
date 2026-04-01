import { Column, Entity, Index } from 'typeorm';
import {
  DATABASE_CONSTRAINTS,
  DATABASE_TABLES,
  ProviderType,
} from '@app/shared';
import { AppBaseEntity } from './base.entity';

@Entity({ name: DATABASE_TABLES.USER_IDENTITY })
@Index(['provider', 'providerUserId'], { unique: true })
export class UserIdentity extends AppBaseEntity {
  @Column({ type: 'varchar', length: DATABASE_CONSTRAINTS.PROVIDER_MAX_LENGTH })
  provider: ProviderType;

  @Column({
    type: 'varchar',
    length: DATABASE_CONSTRAINTS.PROVIDER_USER_ID_MAX_LENGTH,
  })
  providerUserId: string;

  @Column({
    type: 'varchar',
    length: DATABASE_CONSTRAINTS.EMAIL_MAX_LENGTH,
    nullable: true,
  })
  email?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown> | null;
}
