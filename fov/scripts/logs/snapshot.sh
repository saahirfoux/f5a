#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

ensure_day_layout

meta_log="$(new_log_file "server-dev")"
register_log "$meta_log" "server-dev" "snapshot metadata + docker service tail"

{
  echo "[snapshot] started at $(date -Iseconds)"
  echo "[snapshot] root: $ROOT_DIR"
  echo "[snapshot] day dir: $DAY_DIR"
  echo
  if is_cmd_available docker; then
    echo "[snapshot] docker compose ps"
    (cd "$ROOT_DIR" && docker compose ps) || true
    echo
    echo "[snapshot] docker compose logs --tail=200 zero"
    (cd "$ROOT_DIR" && docker compose logs --tail=200 zero) || true
    echo
    echo "[snapshot] docker compose logs --tail=200 pgdb"
    (cd "$ROOT_DIR" && docker compose logs --tail=200 pgdb) || true
  else
    echo "[snapshot] docker not available"
  fi
} 2>&1 | tee -a "$meta_log"

"$SCRIPT_DIR/ios-sim.sh" snapshot || true
"$SCRIPT_DIR/android.sh" snapshot || true
"$SCRIPT_DIR/web.sh" snapshot || true

echo "[snapshot] complete. Logs written under: $DAY_DIR"

