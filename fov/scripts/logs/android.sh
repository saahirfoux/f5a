#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

mode="${1:-snapshot}"
ensure_day_layout

if ! is_cmd_available adb; then
  echo "[android] adb not found; install Android platform-tools."
  exit 0
fi

if [[ -z "$(adb devices | awk '/\tdevice$/ { print $1 }')" ]]; then
  echo "[android] no connected Android device/emulator."
  exit 0
fi

log_file="$(new_log_file "app-android")"
register_log "$log_file" "app-android" "android logcat ($mode)"

if [[ "$mode" == "stream" ]]; then
  {
    echo "[android] stream start $(date -Iseconds)"
    echo "[android] connected devices:"
    adb devices
    echo
    adb logcat -v time ReactNative:V ReactNativeJS:V Zero:V '*:S'
  } 2>&1 | tee -a "$log_file"
  exit "${PIPESTATUS[0]}"
fi

{
  echo "[android] snapshot at $(date -Iseconds)"
  echo "[android] connected devices:"
  adb devices
  echo
  echo "[android] recent app-focused logcat dump:"
  adb logcat -d -v time ReactNative:V ReactNativeJS:V Zero:V '*:S'
} 2>&1 | tee -a "$log_file"

