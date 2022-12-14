import { appSchema } from '@nozbe/watermelondb';

import { carsSchema } from './carsSchema';
import { userSchema } from './userSchema';

const schemas = appSchema({
  version: 3,
  tables: [userSchema, carsSchema],
});

export { schemas };
