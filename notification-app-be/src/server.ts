import app from './app';
import { Log } from '../../logging-middleware/index';

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await Log('backend', 'info', 'service', `Notification App Microservice started on port ${PORT}`);
});
