#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOG_ROOT="$ROOT_DIR/.logs"
DAY="$(date +%F)"
DAY_DIR="$LOG_ROOT/$DAY"
INDEX_FILE="$DAY_DIR/index.md"
LATEST_FILE="$LOG_ROOT/latest"

timestamp() {
  date +%Y%m%d-%H%M%S
}

ensure_day_layout() {
  mkdir -p "$DAY_DIR"
  if [[ ! -f "$INDEX_FILE" ]]; then
    {
      printf '# Log Index (%s)\n\n' "$DAY"
      printf '| Time | Type | File | Notes |\n'
      printf '| --- | --- | --- | --- |\n'
    } >"$INDEX_FILE"
  fi
  printf '%s\n' "$DAY_DIR" >"$LATEST_FILE"
}

new_log_file() {
  local log_type="$1"
  local suffix="${2:-log}"
  local type_dir="$DAY_DIR/$log_type"
  local ts

  ts="$(timestamp)"
  mkdir -p "$type_dir"
  printf '%s/%s.%s\n' "$type_dir" "$ts" "$suffix"
}

register_log() {
  local file_path="$1"
  local log_type="$2"
  local notes="${3:-}"
  local rel
  local t

  rel="${file_path#"$ROOT_DIR/"}"
  t="$(date +%H:%M:%S)"
  printf '| %s | %s | `%s` | %s |\n' "$t" "$log_type" "$rel" "$notes" >>"$INDEX_FILE"
}

is_cmd_available() {
  command -v "$1" >/dev/null 2>&1
}

