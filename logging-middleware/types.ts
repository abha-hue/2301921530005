import { 
  VALID_STACKS, 
  VALID_LEVELS, 
  VALID_BACKEND_PACKAGES, 
  VALID_FRONTEND_PACKAGES, 
  VALID_SHARED_PACKAGES 
} from './constants';

export type LogStack = typeof VALID_STACKS[number];
export type LogLevel = typeof VALID_LEVELS[number];

export type BackendPackage = typeof VALID_BACKEND_PACKAGES[number];
export type FrontendPackage = typeof VALID_FRONTEND_PACKAGES[number];
export type SharedPackage = typeof VALID_SHARED_PACKAGES[number];

export type LogPackage = BackendPackage | FrontendPackage | SharedPackage;

export interface LogPayload {
  stack: LogStack;
  level: LogLevel;
  package: LogPackage;
  message: string;
}
