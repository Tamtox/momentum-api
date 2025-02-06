export type QueryBuilderOptions = {
  returning?: string[];
};

export type PostgresQueryCondition = {
  prefix: 'AND' | 'OR' | 'WHERE';
  field: string;
  operator: string;
  value: string;
};

export const generateSelectionQuery = (selectedFields: string[] | '*', tableName: string, conditions: string[]) => {};

export const generateInsertionQuery = <T extends Object>(
  tableName: string,
  object: T,
  options?: QueryBuilderOptions,
) => {
  const keys = Object.keys(object);
  const vals = Object.values(object);
  let query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')})`;
  if (options?.returning) {
    query += ` RETURNING ${options.returning.join(', ')}`;
  }
  query += ';';
  return { query, vals };
};

export const generateInsertionQueryWithConflict = <T extends Object>(
  tableName: string,
  object: T,
  conflictKeys: string[],
  options?: QueryBuilderOptions,
) => {
  const keys = Object.keys(object);
  const vals = Object.values(object);
  let query = `INSERT INTO ${tableName} (${keys.join(', ')}) 
  VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')}) 
  ON CONFLICT (${conflictKeys.join(', ')}) DO UPDATE
  SET ${keys.map((key, i) => `${key} = EXCLUDED.${key}`).join(', ')}`;
  if (options?.returning) {
    query += ` RETURNING ${options.returning.join(', ')}`;
  }
  query += ';';
  return { query, vals };
};
