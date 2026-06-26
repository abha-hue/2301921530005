# Logging Middleware

This is a simple tool to help us track what is happening inside our applications. Instead of using `console.log()` everywhere, we use this package to send our logs directly to a central server.

## Why use this?
When you build a big app, reading a messy terminal output is hard. By using this logger:
1. All our logs go to one place.
2. We know exactly where the log came from (frontend or backend).
3. We know the level of importance (info, error, debug, etc).

## How to use it in your code

Just import the `Log` function and use it anywhere you would normally put a `console.log`:

```typescript
import { Log } from '../logging-middleware';

// Example: Sending an info message
await Log('backend', 'info', 'service', 'Fetching some data from the database');

// Example: Sending an error message
await Log('backend', 'error', 'db', 'Could not connect to database');
```

## How to use the Express logger
We also made a really easy tool to log every single web request that comes to our server. You just add it to your Express app like this:

```typescript
import express from 'express';
import { requestLoggerMiddleware } from '../logging-middleware';

const app = express();
app.use(requestLoggerMiddleware);
```

That's it! It will automatically log when a user visits your website or uses your API.
