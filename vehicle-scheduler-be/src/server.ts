import app from './app';
import { Log } from '../../logging-middleware/index';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await Log('backend', 'info', 'service', `Vehicle Scheduler Microservice started on port ${PORT}`);
});
