
import { Connection } from 'mongoose';
import { AuditSchema } from './audit.schema';

export const auditProviders = [
  {
    provide: 'AUDIT_MODEL',
    useFactory: (connection: Connection) => connection.model('audit', AuditSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
