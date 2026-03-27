# @wxn0brp/gls-limit

Rate limiting and event management library for GlovesLink server sockets.

## Installation

```bash
bun add @wxn0brp/gls-limit @wxn0brp/gloves-link-server @wxn0brp/ac
```

## Quick Start

```typescript
import { setupSocket } from "@wxn0brp/gls-limit";
import { Events, Socket_StandardRes } from "@wxn0brp/gls-limit/types";
import { SocketRes } from "@wxn0brp/gls-limit/validError";
import { GLSocket } from "@wxn0brp/gloves-link-server";

const events: Events[][] = [
  [
    ["handle.message", 100, true, handle_message],
  ]
];

async function handle_message(socket: GLSocket, message: string): Promise<Socket_StandardRes> {
  const res = new SocketRes("handle.message");

  if (!message) return res.valid("message is required");
  if (typeof message !== "string") return res.valid("message must be a string");

  return res.data("message sent");
}

function onConnection(socket: GLSocket) {
  const { engine, limiter } = setupSocket(socket, events);
}
```

## API

### `setupSocket(socket, events, logError?)`

```typescript
import { setupSocket } from "@wxn0brp/gls-limit";

const { engine, limiter } = setupSocket(socket, events);
```

**Returns:**
- `engine: SocketEventEngine` - Event handler with rate limiting
- `limiter: SocketEventLimiter` - Rate limiter instance

### Rate Limiting

Default spam thresholds:

```typescript
{
  warningDelay: 100,      // ms delay after warnLimit
  warnLimit: 1,           // warnings before action
  spamLimit: 5,           // max events before blocking
  disconnectLimit: 15,    // events before disconnect + ban
  resetInterval: 1000,    // ms before counter reset
  banDuration: 600000     // 10 minutes
}
```

**Banned users:**
```typescript
import { bannedUsers } from "@wxn0brp/gls-limit/limiter";

const banExpiry = bannedUsers.get(userId);
```

### Error Handling

```typescript
import { SocketRes } from "@wxn0brp/gls-limit/validError";

const res = new SocketRes("event.name");

res.data({ key: "value" });           // Success response
res.valid("Field is required");       // Validation error
res.err("Something went wrong");      // General error
```

### Events

- spam notifications via `error.spam`:

```typescript
socket.on("error.spam", (type, ...args) => {
  // "warn"           - Warning issued
  // "last", time     - Final warning (time in seconds)
  // "ban", duration  - User banned (duration in ms)
});
```

- validation errors via `error.valid`:

```typescript
socket.on("error.valid", (module, ...args) => {});
```

- general errors via `error`:

```typescript
socket.on("error", (module, ...args) => {});
```

## License

MIT
