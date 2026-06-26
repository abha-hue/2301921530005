import axios from 'axios';
import { LOGGING_API_URL } from './constants';
import { LogStack, LogLevel, LogPackage } from './types';
import { validateLogInput } from './validator';

export async function Log(stack: LogStack, level: LogLevel, packageName: LogPackage, message: string) {
  try {
    validateLogInput(stack, level, packageName, message);

    const payload = {
      stack,
      level,
      package: packageName,
      message
    };

    await axios.post(LOGGING_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      throw error;
    }
  }
}
