import { createHash } from 'crypto';
import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

const MAX_POSTGRES_IDENTIFIER_LENGTH = 63;

function toSnakeCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[.\-\s]+/g, '_')
    .toLowerCase();
}

function shortenIdentifier(identifier: string): string {
  if (identifier.length <= MAX_POSTGRES_IDENTIFIER_LENGTH) {
    return identifier;
  }

  const digest = createHash('sha1')
    .update(identifier)
    .digest('hex')
    .slice(0, 8);
  const keepLength = MAX_POSTGRES_IDENTIFIER_LENGTH - digest.length - 1;
  return `${identifier.slice(0, keepLength)}_${digest}`;
}

export class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(targetName: string, userSpecifiedName?: string): string {
    return shortenIdentifier(toSnakeCase(userSpecifiedName ?? targetName));
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return shortenIdentifier(
      toSnakeCase(`${embeddedPrefixes.join('_')}${customName ?? propertyName}`),
    );
  }

  relationName(propertyName: string): string {
    return shortenIdentifier(toSnakeCase(propertyName));
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return shortenIdentifier(
      toSnakeCase(`${relationName}_${referencedColumnName}`),
    );
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return shortenIdentifier(
      toSnakeCase(
        `${firstTableName}_${firstPropertyName}_${secondTableName}_${secondPropertyName}`,
      ),
    );
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return shortenIdentifier(
      toSnakeCase(`${tableName}_${columnName ?? propertyName}`),
    );
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    return shortenIdentifier(
      `pk_${toSnakeCase(tableName)}_${columnNames.join('_')}`,
    );
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    return shortenIdentifier(
      `uq_${toSnakeCase(tableName)}_${columnNames.join('_')}`,
    );
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const referencedPart = referencedTablePath
      ? `_${toSnakeCase(referencedTablePath)}`
      : '';
    const referencedColumns = referencedColumnNames?.length
      ? `_${referencedColumnNames.join('_')}`
      : '';

    return shortenIdentifier(
      `fk_${toSnakeCase(tableName)}_${columnNames.join('_')}${referencedPart}${referencedColumns}`,
    );
  }

  indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
  ): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const whereDigest = where
      ? `_${createHash('sha1').update(where).digest('hex').slice(0, 6)}`
      : '';

    return shortenIdentifier(
      `idx_${toSnakeCase(tableName)}_${columnNames.join('_')}${whereDigest}`,
    );
  }

  checkConstraintName(tableOrName: Table | string, expression: string): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
    const digest = createHash('sha1')
      .update(expression)
      .digest('hex')
      .slice(0, 8);
    return shortenIdentifier(`chk_${toSnakeCase(tableName)}_${digest}`);
  }
}
