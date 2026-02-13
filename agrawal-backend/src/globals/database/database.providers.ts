
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://mukesh:DEBtGyG8xZQIi7cp@demo.yagpg.mongodb.net/agarwal?retryWrites=true&w=majority'),
  },
];
