import {
  VALID_STACKS,
  VALID_LEVELS,
  VALID_BACKEND_PACKAGES,
  VALID_FRONTEND_PACKAGES,
  VALID_SHARED_PACKAGES
} from './constants';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateLogInput(stack: any, level: any, packageName: any, message: any) {
  if (!VALID_STACKS.includes(stack)) {
    throw new ValidationError("Invalid stack");
  }

  if (!VALID_LEVELS.includes(level)) {
    throw new ValidationError("Invalid level");
  }

  const allPackages = [
    ...VALID_BACKEND_PACKAGES,
    ...VALID_FRONTEND_PACKAGES,
    ...VALID_SHARED_PACKAGES
  ];

  if (!allPackages.includes(packageName)) {
    throw new ValidationError("Invalid package");
  }

  if (stack === 'backend') {
    if (!VALID_BACKEND_PACKAGES.includes(packageName) && !VALID_SHARED_PACKAGES.includes(packageName)) {
      throw new ValidationError("Wrong package for backend");
    }
  }

  if (stack === 'frontend') {
    if (!VALID_FRONTEND_PACKAGES.includes(packageName) && !VALID_SHARED_PACKAGES.includes(packageName)) {
      throw new ValidationError("Wrong package for frontend");
    }
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new ValidationError("Message must be a string");
  }
}
