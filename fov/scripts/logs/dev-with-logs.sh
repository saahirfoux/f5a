#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

LOCK_FILE="$LOG_ROOT/.stream.lock"
started_by_this_run=0

ensure_day_layout

is_stream_live() {
  if [[ ! -f "$LOCK_FILE" ]]; then
    return 1
  fi
  local pid
  pid="$(sed -n 's/^pid=//p' "$LOCK_FILE" | tr -d '[:space:]')"
  [[ -n "$pid" ]] && kill -0 "$pid" >/dev/null 2>&1
}

if is_stream_live; then
  echo "ℹ️  log stream already running; reusing current supervisor."
else
  echo "ℹ️  starting background log stream supervisor..."
  "$SCRIPT_DIR/stream.sh" --ensure >"$LOG_ROOT/.stream.supervisor.out" 2>&1 &
  sleep 1
  if is_stream_live; then
    started_by_this_run=1
  else
    echo "⚠️  stream supervisor did not start; continuing with dev server anyway."
  fi
fi

server_log="$(new_log_file "server-dev")"
register_log "$server_log" "server-dev" "one dev stdout/stderr stream"

cleanup() {
  local exit_code=$?
  if [[ "$started_by_this_run" -eq 1 ]]; then
    "$SCRIPT_DIR/stream.sh" --stop >/dev/null 2>&1 || true
  fi
  exit "$exit_code"
}

trap cleanup EXIT INT TERM

echo "ℹ️  auth/demo login needs backend. In another terminal run: bun backend"
echo "ℹ️  logs writing to: $DAY_DIR"

set +e
one dev 2>&1 | tee -a "$server_log"
dev_exit=${PIPESTATUS[0]}
set -e

exit "$dev_exit"

