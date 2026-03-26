#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

mode="${1:-snapshot}"
ensure_day_layout

log_file="$(new_log_file "app-web")"
register_log "$log_file" "app-web" "web diagnostics + console export guidance ($mode)"

{
  echo "[web] mode: $mode"
  echo "[web] timestamp: $(date -Iseconds)"
  echo
  echo "[web] server checks:"
  if is_cmd_available curl; then
    printf '  localhost:8081 -> '
    curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:8081/ || echo "unreachable"
    printf '  localhost:4948 -> '
    curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:4948/ || echo "unreachable"
  else
    echo "  curl not available"
  fi
  echo
  echo "[web] browser console export guidance:"
  echo "  - Chrome/Edge: DevTools -> Console -> right click -> Save as..."
  echo "  - Safari: Enable Develop menu, then open Web Inspector Console and copy/export logs."
  echo "  - Include network failures for /api/auth/* and /api/zero/* when sharing."
} 2>&1 | tee -a "$log_file"

