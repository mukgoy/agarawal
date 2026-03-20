
import { Connection } from 'mongoose';
import { ShaadiProfileSchema } from './schemas/shaadi-profile.schema';

export const shaadiProviders = [
  {
    provide: 'SHAADI_PROFILE_MODEL',
    useFactory: (connection: Connection) => connection.model('ShaadiProfile', ShaadiProfileSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
