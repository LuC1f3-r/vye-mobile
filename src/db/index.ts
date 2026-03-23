import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Database} from '@nozbe/watermelondb';

import {schema} from './schema';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true,
  onSetUpError: error => {
    console.error('WatermelonDB setup failed', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [],
});
