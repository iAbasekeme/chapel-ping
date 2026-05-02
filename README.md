# chapel-ping

A NestJS background service that delivers automated weekly SMS reminders to church members via the [Termii](https://termii.com) messaging API. The service uses PostgreSQL for subscriber persistence and `@nestjs/schedule` for cron-based job execution — no queues, no Redis, no Bull.

---

## Architecture

```
src/
├── main.ts                          # Bootstrap + dotenv loader
├── app.module.ts                    # Root module — TypeORM, Schedule, feature modules
├── data-source.ts                   # Standalone TypeORM DataSource (CLI / migrations)
├── seed.ts                          # One-shot DB seeder script
│
├── subscribers/
│   ├── subscriber.entity.ts         # TypeORM entity → `subscribers` table
│   ├── subscribers.service.ts       # CRUD + findActive()
│   ├── subscribers.controller.ts    # REST endpoints
│   ├── subscribers.module.ts
│   └── dto/
│       └── create-subscriber.dto.ts
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
├── TypeOrmModule (global)
├── ScheduleModule (global)
├── SubscribersModule  ──exports──► SubscribersService
├── SmsModule          ──exports──► SmsService
└── JobsModule
    ├── imports SubscribersModule
    └── imports SmsModule
```

---

## Database

**Provider:** PostgreSQL (hosted on Render)
**ORM:** TypeORM `^0.3`

### `subscribers` table

| Column         | Type                      | Constraints          |
|----------------|---------------------------|----------------------|
| `id`           | `integer`                 | PK, auto-increment   |
| `name`         | `varchar`                 | NOT NULL             |
| `phone_number` | `varchar`                 | NOT NULL             |
| `active`       | `boolean`                 | DEFAULT `true`       |
| `created_at`   | `timestamp with time zone`| auto-set on insert   |

Schema is managed via `synchronize: true` in development. For production, disable this and use TypeORM migrations:

```bash
npm run migration:run
npm run migration:revert
npm run schema:sync
```

---

## Cron Jobs

Both jobs are defined in `JobsService` using `@Cron` from `@nestjs/schedule`, with explicit `timeZone: 'Africa/Lagos'` (WAT, UTC+1).

| Job | Schedule (cron) | Time (WAT) | Message |
|-----|-----------------|------------|---------|
| Saturday reminder | `0 20 * * 6` | Sat 8:00 PM | *"Hey [name], just a reminder that church service is tomorrow by 9AM. See you there 🙏"* |
| Sunday morning    | `0 8 * * 0`  | Sun 8:00 AM | *"Good morning [name], service starts in 1 hour. God bless you 🙌"* |

Each job:
1. Queries `subscribers WHERE active = true`
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

## REST API

Base URL: `http://localhost:3000`

### `POST /subscribers`
Add a new subscriber.

**Request body:**
```json
{ "name": "Ada", "phone_number": "2348012345678" }
```

**Response:** `201` — the created subscriber object.

---

### `GET /subscribers`
List all subscribers, ordered by `created_at DESC`.

**Response:** `200` — array of subscriber objects.

---

### `PATCH /subscribers/:id/deactivate`
Soft-disable a subscriber (sets `active = false`). They will no longer receive SMS reminders.

**Response:** `200` — updated subscriber object. Returns `404` if ID not found.

---

## Environment Variables

| Variable           | Required | Description |
|--------------------|----------|-------------|
| `DB_HOST`          | ✅       | PostgreSQL host |
| `DB_PORT`          | ✅       | PostgreSQL port (default `5432`) |
| `DB_NAME`          | ✅       | Database name |
| `DB_USER`          | ✅       | Database user |
| `DB_PASSWORD`      | ✅       | Database password |
| `TERMII_API_KEY`   | ✅       | Termii secret API key |
| `TERMII_SENDER_ID` | ✅       | Registered sender ID (e.g. `Chapel`) |
| `TZ`               | ✅       | Must be `Africa/Lagos` for correct cron timing |
| `PORT`             | ❌       | HTTP port (default `3000`) |

Copy `.env.example` to `.env` and fill in values before running.

---

## Running Locally

```bash
# Install dependencies
npm install

# Seed the database with initial subscribers
npm run seed

# Start in watch mode
npm run start:dev

# Production build + start
npm run build && npm start
```

---

## Seeding

Edit the `subscribers` array in [src/seed.ts](src/seed.ts), then:

```bash
npm run seed
```

The seeder skips existing phone numbers, so it is safe to run multiple times.
