import { Module } from '@nestjs/common';
import { auditProviders } from './audit.providers';

@Module({
  providers: [...auditProviders]
})
export class AuditModule {}