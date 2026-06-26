export const VALID_STACKS = ['backend', 'frontend'] as const;

export const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'] as const;

export const VALID_BACKEND_PACKAGES = [
  'cache', 'controller', 'cron_job', 'db', 'domain', 
  'handler', 'repository', 'route', 'service'
] as const;

export const VALID_FRONTEND_PACKAGES = [
  'api', 'component', 'hook', 'page', 'state', 'style'
] as const;

export const VALID_SHARED_PACKAGES = [
  'auth', 'config', 'middleware', 'utils'
] as const;

export const LOGGING_API_URL = 'http://4.224.186.213/evaluation-service/logs';
