#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

mode="${1:-snapshot}"
ensure_day_layout

if ! is_cmd_available xcrun; then
  echo "[ios-sim] xcrun not found; install Xcode command line tools."
  exit 0
fi

if [[ -z "$(xcrun simctl list devices booted | sed -n '/Booted/p')" ]]; then
  echo "[ios-sim] no booted iOS simulator; start one with 'bun ios' or 'open -a Simulator'."
  exit 0
fi

log_file="$(new_log_file "app-ios")"
register_log "$log_file" "app-ios" "ios simulator logs ($mode)"

if [[ "$mode" == "stream" ]]; then
  {
    echo "[ios-sim] stream start $(date -Iseconds)"
    echo "[ios-sim] running: xcrun simctl spawn booted log stream --style compact"
    xcrun simctl spawn booted log stream --style compact
  } 2>&1 | tee -a "$log_file"
  exit "${PIPESTATUS[0]}"
fi

{
  echo "[ios-sim] snapshot at $(date -Iseconds)"
  echo "[ios-sim] booted devices:"
  xcrun simctl list devices booted
  echo
  echo "[ios-sim] recent simulator logs (last 5m):"
  xcrun simctl spawn booted log show --style compact --last 5m
} 2>&1 | tee -a "$log_file"

