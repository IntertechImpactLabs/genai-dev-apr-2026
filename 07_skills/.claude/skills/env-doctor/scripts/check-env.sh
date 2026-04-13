#!/usr/bin/env bash
# Checks the local development environment and reports status.
# Each output line is prefixed: OK, MISSING, WARN, or DEFAULT.

set -euo pipefail

# ── Runtime versions ─────────────────────────────────────────────────────────

check_command() {
  local name="$1"
  local cmd="$2"
  local required="$3"

  if command -v "$cmd" &>/dev/null; then
    local version
    version=$("$cmd" --version 2>&1 | head -1)
    echo "OK       [$name] $version"
  else
    echo "MISSING  [$name] not found (required: $required)"
  fi
}

check_node_version() {
  if command -v node &>/dev/null; then
    local version
    version=$(node --version | sed 's/v//')
    local major
    major=$(echo "$version" | cut -d. -f1)
    if [ "$major" -ge 18 ]; then
      echo "OK       [node] v$version (required: >=18)"
    else
      echo "WARN     [node] v$version is below required >=18"
    fi
  else
    echo "MISSING  [node] not found"
  fi
}

check_node_version
check_command "npm"  "npm"  "bundled with Node"
check_command "git"  "git"  "any recent version"

# ── Environment variables ─────────────────────────────────────────────────────

check_env() {
  local name="$1"
  local default_note="${2:-}"

  if [ -n "${!name:-}" ]; then
    echo "OK       [env:$name] set"
  elif [ -n "$default_note" ]; then
    echo "DEFAULT  [env:$name] not set — $default_note"
  else
    echo "MISSING  [env:$name] not set"
  fi
}

check_env "DATABASE_URL"
check_env "JWT_SECRET"
check_env "NODE_ENV"  "will default to 'development'"
check_env "PORT"      "will default to 3000"

# ── Local setup state ─────────────────────────────────────────────────────────

if [ -f ".env" ]; then
  echo "OK       [.env file] present"
elif [ -f ".env.example" ]; then
  echo "MISSING  [.env file] not found — copy .env.example to .env and fill in values"
else
  echo "WARN     [.env file] not found and no .env.example to copy from"
fi

if [ -d "node_modules" ]; then
  echo "OK       [node_modules] present"
else
  echo "MISSING  [node_modules] not found — run npm install"
fi
