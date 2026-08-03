#!/bin/sh
set -e

if ! command -v node >/dev/null 2>&1; then
  echo "node not found" >&2
  exit 1
fi

node -e "require('fs').accessSync('VERSION')"

if [ -f scripts/system-validation.mjs ]; then
  node scripts/system-validation.mjs --health-only 2>/dev/null || true
fi

exit 0
