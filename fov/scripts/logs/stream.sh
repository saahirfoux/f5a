#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

LOCK_FILE="$LOG_ROOT/.stream.lock"
PIDS_FILE="$LOG_ROOT/.stream.pids"

cmd="${1:-run}"

is_pid_live() {
  local pid="$1"
  [[ -n "$pid" ]] && kill -0 "$pid" >/dev/null 2>&1
}

read_lock_pid() {
  if [[ -f "$LOCK_FILE" ]]; then
    sed -n 's/^pid=//p' "$LOCK_FILE" | tr -d '[:space:]'
  fi
}

clear_lock() {
  rm -f "$LOCK_FILE" "$PIDS_FILE"
}

kill_children() {
  if [[ -f "$PIDS_FILE" ]]; then
    while IFS= read -r pid; do
      if is_pid_live "$pid"; then
        kill "$pid" >/dev/null 2>&1 || true
      fi
    done <"$PIDS_FILE"
  fi
}

stop_stream() {
  local lock_pid
  lock_pid="$(read_lock_pid || true)"
  if [[ -n "$lock_pid" ]] && is_pid_live "$lock_pid"; then
    kill "$lock_pid" >/dev/null 2>&1 || true
    sleep 1
    if is_pid_live "$lock_pid"; then
      kill -9 "$lock_pid" >/dev/null 2>&1 || true
    fi
    echo "[logs] stopped stream supervisor pid=$lock_pid"
  else
    echo "[logs] no active stream supervisor"
  fi
  clear_lock
}

status_stream() {
  local lock_pid
  lock_pid="$(read_lock_pid || true)"
  if [[ -n "$lock_pid" ]] && is_pid_live "$lock_pid"; then
    echo "[logs] stream: running (pid=$lock_pid)"
    if [[ -f "$PIDS_FILE" ]]; then
      echo "[logs] children:"
      while IFS= read -r pid; do
        if is_pid_live "$pid"; then
          echo "  - $pid (alive)"
        else
          echo "  - $pid (dead)"
        fi
      done <"$PIDS_FILE"
    fi
    exit 0
  fi
  if [[ -f "$LOCK_FILE" ]]; then
    echo "[logs] stream: stale lock detected (clean with bun logs:stop)"
    exit 0
  fi
  echo "[logs] stream: not running"
  exit 0
}

if [[ "$cmd" == "--stop" ]]; then
  stop_stream
  exit 0
fi

if [[ "$cmd" == "--status" ]]; then
  status_stream
fi

ensure_day_layout
mkdir -p "$LOG_ROOT"

existing_pid="$(read_lock_pid || true)"
if [[ -n "$existing_pid" ]] && is_pid_live "$existing_pid"; then
  echo "[logs] stream already running pid=$existing_pid"
  exit 0
fi

if [[ -f "$LOCK_FILE" ]]; then
  echo "[logs] removing stale stream lock"
  clear_lock
fi

echo "pid=$$" >"$LOCK_FILE"
: >"$PIDS_FILE"

cleanup() {
  kill_children
  clear_lock
}

trap cleanup EXIT INT TERM

spawn_logger() {
  local log_type="$1"
  shift
  local log_file
  log_file="$(new_log_file "$log_type")"
  register_log "$log_file" "$log_type" "stream collector"
  (
    "$@"
  ) 2>&1 | tee -a "$log_file" &
  echo "$!" >>"$PIDS_FILE"
}

spawn_logger "app-ios" "$SCRIPT_DIR/ios-sim.sh" stream
spawn_logger "app-android" "$SCRIPT_DIR/android.sh" stream

spawn_logger "docker-zero" bash -lc "cd \"$ROOT_DIR\" && docker compose logs -f zero"
spawn_logger "docker-pgdb" bash -lc "cd \"$ROOT_DIR\" && docker compose logs -f pgdb"

spawn_logger "app-web" "$SCRIPT_DIR/web.sh" stream

wait

