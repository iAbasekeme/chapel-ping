# chapel-ping

A NestJS background service that delivers automated weekly SMS reminders to church members via the [Termii](https://termii.com) messaging API. Subscribers are currently loaded from a local TypeScript file, and `@nestjs/schedule` handles cron-based execution.

---

## Architecture

```
src/
├── main.ts                          # Bootstrap + dotenv loader
├── app.module.ts                    # Root module — Schedule and feature modules
│
├── subscribers/
├── migrations/
│   └── 1779490000000-SeedSubscribers.ts # Runtime reminder recipients
│
├── sms/
│   ├── sms.service.ts               # Termii HTTP client (axios)
│   └── sms.module.ts
│
└── jobs/
    ├── jobs.service.ts              # Cron job definitions
    └── jobs.module.ts
```

### Module dependency graph

```
AppModule
├── ScheduleModule (global)
├── SmsModule
└── JobsModule ──imports──► SmsModule
```

---

## Subscribers

Edit `src/migrations/1779490000000-SeedSubscribers.ts` to add or remove reminder recipients. Phone numbers must use E.164 format without the leading `+`, for example `2348012345678`.

---

## Cron Jobs

The Sunday job uses `@Cron` from `@nestjs/schedule`, with an explicit `Africa/Lagos` timezone. The Saturday schedule is currently commented out, but its manual trigger remains available.

| Job | Schedule (cron) | Time (WAT) | Message |
|-----|-----------------|------------|---------|
| Saturday reminder | Disabled | Manual only | Sunday service reminder |
| Sunday morning    | `30 7 * * 0` | Sun 7:30 AM | Service starts in less than 30 minutes |

Each job:
1. Loads recipients from `1779490000000-SeedSubscribers.ts`
2. Iterates over results sequentially
3. Calls `SmsService.send()` per subscriber
4. Logs success/failure per message to stdout

Failures are caught per-subscriber — a single bad number does not abort the loop.

---

## Termii SMS Integration

**Endpoint:** `POST https://api.ng.termii.com/api/sms/send`
**Channel:** `generic`
**Message type:** `plain`

Request payload shape:

```json
{
  "to": "2348012345678",
  "from": "<TERMII_SENDER_ID>",
  "sms": "...",
  "type": "plain",
  "channel": "generic",
  "api_key": "<TERMII_API_KEY>"
}
```

Phone numbers must be in **E.164 format without the `+`** (e.g. `2348012345678`).

---

## Manual triggers

Base URL: `http://localhost:3000`

Use `POST /jobs/trigger/saturday-reminder` or `POST /jobs/trigger/Sunday-morning-reminder`. These endpoints send real messages to every listed subscriber.

---

## Environment Variables

| Variable           | Required | Description |
|--------------------|----------|-------------|
| `TERMII_API_KEY`   | ✅       | Termii secret API key |
| `TERMII_SENDER_ID` | ✅       | Registered sender ID (e.g. `Chapel`) |
| `TZ`               | ✅       | Must be `Africa/Lagos` for correct cron timing |
| `PORT`             | ❌       | HTTP port (default `3000`) |
| `SMS_SEND_DELAY_MS`| ❌       | Delay between messages (default `250`) |

Copy `.env.example` to `.env` and fill in values before running.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start in watch mode
npm run start:dev

# Production build + start
npm run build && npm start
```
