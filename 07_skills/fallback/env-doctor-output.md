# Fallback: Environment Doctor Output

Pre-captured output for the env-doctor skill demo.

---

## Script output (`check-env.sh`)

```
OK       [node] v20.11.0 (required: >=18)
OK       [npm] 10.2.4
OK       [git] 2.43.2
MISSING  [env:DATABASE_URL] not set
MISSING  [env:JWT_SECRET] not set
DEFAULT  [env:NODE_ENV] not set — will default to 'development'
DEFAULT  [env:PORT] not set — will default to 3000
MISSING  [.env file] not found — copy .env.example to .env and fill in values
MISSING  [node_modules] not found — run npm install
```

---

## Agent output

### Blockers — app will not start

**DATABASE_URL is missing.**
This is the connection string the app uses to reach Postgres. Without it, every request that hits the database (including `createOrder`) will crash with a connection error. Copy `.env.example` to `.env` and set `DATABASE_URL` to your local Postgres URL, e.g. `postgres://localhost:5432/orders_dev`.

**JWT_SECRET is missing.**
The auth middleware uses this to sign and verify tokens. Missing it means no authenticated endpoint will work — requests will be rejected or pass through unsigned. Set it to any long random string for local development (`openssl rand -hex 32` works).

**node_modules is missing.**
The app won't start at all without its dependencies installed.

### Advisory — safe defaults in use

**NODE_ENV** will default to `'development'`, which enables verbose error messages. Fine locally, not for staging.

**PORT** will default to `3000`. Fine unless something else is already using that port.

---

## Fix checklist

1. [ ] `cp .env.example .env`
2. [ ] Set `DATABASE_URL` in `.env` (e.g. `postgres://localhost:5432/orders_dev`)
3. [ ] Set `JWT_SECRET` in `.env` (`openssl rand -hex 32`)
4. [ ] `npm install`
