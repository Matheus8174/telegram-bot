import 'reflect-metadata';
import './database/connection';

import cron from 'node-cron';

const job = cron.schedule(
  '* * * * * *',
  () => {
    console.log('running a task every minute');
  },
  {
    timezone: 'America/Sao_Paulo'
  }
);

job.start();
