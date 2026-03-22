# @wxn0brp/gls-limit

A rate limiting and event management library for GlovesLink server sockets. Provides spam protection, event throttling, and structured error handling.

## Installation

```bash
bun add @wxn0brp/gls-limit @wxn0brp/gloves-link-server @wxn0brp/ac
```

## Quick Start

```typescript
import { setupSocket } from "@wxn0brp/gls-limit";
import { GLSocket } from "@wxn0brp/gloves-link-server";

// Define your events
const events: Events[][] = [
  [
    // [eventName, timeLimit, isReturn, handler]
    ["sendMessage", 100, true, async (user, message, cb) => {
      // Handle message
      return { res: ["ok"] };
    }]
  ]
];

// Setup socket with limiter and engine
function onConnection(socket: GLSocket) {
  const { socket, engine, limiter } = setupSocket(socket, events);
}
```

## API

### `setupSocket(socket, events)`

Initializes the socket with rate limiting and event handling capabilities.

**Parameters:**
- `socket: GLSocket` - The GlovesLink socket instance
- `events: Events[][]` - Array of event definitions

**Returns:**
```typescript
{
  socket: GLSocket,
  engine: SocketEventEngine,
  limiter: SocketEventLimiter
}
```

### Socket Extensions

The library extends `GLSocket` with additional methods:

- `logError(e: Error)` - Error logging function
- `onLimit(event, limit, fn)` - Register rate-limited event handler
- `processSocketError(res, cb?)` - Process and emit error responses

## Rate Limiting

### Spam Thresholds

Default thresholds:

```typescript
{
  warningDelay: 100,      // ms delay before processing after warnLimit
  warnLimit: 1,           // warnings before action
  spamLimit: 5,           // max events before blocking
  disconnectLimit: 15,    // events before disconnect + ban
  resetInterval: 1000,    // ms before counter resets
  banDuration: 600000     // 10 minutes ban
}
```

### Custom Thresholds

```typescript
const limiter = new SocketEventLimiter(socket, {
  spamLimit: 10,
  resetInterval: 2000
});
```

### Banned Users

Access the banned users cache:

```typescript
import { bannedUsers } from "@wxn0brp/gls-limit/limiter";

// Check if user is banned
const banExpiry = bannedUsers.get(userId);
```

## Event Engine

### `SocketEventEngine.add(event, time, isReturn, handler)`

Registers an event handler with rate limiting.

**Parameters:**
- `event: string` - Event name
- `time: number` - Time limit in ms
- `isReturn: boolean` - Whether to return response to client
- `handler: Function` - Async handler `(user, ...args) => Promise<Socket_StandardRes>`

## Error Handling

### `ValidError`

Helper class for structured error responses:

```typescript
import ValidError from "@wxn0brp/gls-limit/validError";

const validError = new ValidError("userModule");

// Return validation error
return validError.valid("Invalid username");
// { err: ["error.valid", "userModule", "Invalid username"] }

// Return general error
return validError.err("Database connection failed");
// { err: ["error", "userModule", "Database connection failed"] }
```

### Response Format

```typescript
interface Socket_StandardRes<T = any> {
  err: false | ["error" | "error.valid", string, ...any[]]
  res?: T
}
```

## Events

### Client-emitted Events

- `error.spam` - Spam detection notifications
  - `"warn"` - Warning threshold approached
  - `"last", time` - Final warning with reset time in seconds
  - `"ban", duration` - User banned with duration in ms

## License

MIT
