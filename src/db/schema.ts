import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        {name: 'remote_id', type: 'string', isOptional: true},
        {name: 'access_token', type: 'string', isOptional: true},
        {name: 'average_cycle', type: 'number'},
        {name: 'average_period', type: 'number'},
        {name: 'is_premium', type: 'boolean'},
        {name: 'dirty', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
        {name: 'last_synced_at', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'cycles',
      columns: [
        {name: 'remote_id', type: 'string', isOptional: true},
        {name: 'start_date', type: 'number'},
        {name: 'end_date', type: 'number', isOptional: true},
        {name: 'is_predicted', type: 'boolean'},
        {name: 'dirty', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
        {name: 'last_synced_at', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'daily_logs',
      columns: [
        {name: 'remote_id', type: 'string', isOptional: true},
        {name: 'date', type: 'number'},
        {name: 'flow_level', type: 'string', isOptional: true},
        {name: 'mood', type: 'string', isOptional: true},
        {name: 'symptoms_json', type: 'string', isOptional: true},
        {name: 'temperature', type: 'number', isOptional: true},
        {name: 'weight', type: 'number', isOptional: true},
        {name: 'notes', type: 'string', isOptional: true},
        {name: 'dirty', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
        {name: 'last_synced_at', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'reminders',
      columns: [
        {name: 'remote_id', type: 'string', isOptional: true},
        {name: 'type', type: 'string'},
        {name: 'time_utc', type: 'number'},
        {name: 'is_active', type: 'boolean'},
        {name: 'dirty', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
        {name: 'last_synced_at', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'content',
      columns: [
        {name: 'remote_id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string', isOptional: true},
        {name: 'content_type', type: 'string'},
        {name: 'is_premium', type: 'boolean'},
        {name: 'thumbnail_url', type: 'string'},
        {name: 'media_url', type: 'string'},
        {name: 'last_synced_at', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'content_access',
      columns: [
        {name: 'remote_id', type: 'string', isOptional: true},
        {name: 'content_remote_id', type: 'string'},
        {name: 'progress', type: 'number'},
        {name: 'completed', type: 'boolean'},
        {name: 'dirty', type: 'boolean'},
        {name: 'deleted', type: 'boolean'},
        {name: 'last_synced_at', type: 'number', isOptional: true},
      ],
    }),
  ],
});
