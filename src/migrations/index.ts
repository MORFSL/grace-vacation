import * as migration_20251016_070004_initial from './20251016_070004_initial';

export const migrations = [
  {
    up: migration_20251016_070004_initial.up,
    down: migration_20251016_070004_initial.down,
    name: '20251016_070004_initial'
  },
];
