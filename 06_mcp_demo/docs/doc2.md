# Deployment Guide

## Environments

| Environment | URL | Branch | Auto-deploy |
|-------------|-----|--------|-------------|
| Development | dev.example.com | `develop` | Yes |
| Staging | staging.example.com | `main` | Yes |
| Production | api.example.com | `main` (tagged) | Manual |

## Deploy process

1. Merge PR to `main`
2. CI runs tests + build
3. Docker image pushed to ECR
4. Staging auto-deploys via ArgoCD
5. Production requires manual approval in GitHub Actions

## Rollback

```bash
# Quick rollback to previous version
kubectl rollout undo deployment/api -n production

# Rollback to specific revision
kubectl rollout undo deployment/api -n production --to-revision=3
```

## Environment variables

Required environment variables are documented in `.env.example`. Secrets are managed through AWS Secrets Manager and injected at deploy time.

## Health checks

- `GET /health` — basic liveness (200 if process is running)
- `GET /health/ready` — readiness (checks database and Redis connectivity)
