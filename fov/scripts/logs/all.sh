#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mode="${1:-snapshot}"

case "$mode" in
stream)
  "$SCRIPT_DIR/stream.sh" run
  ;;
snapshot)
  "$SCRIPT_DIR/snapshot.sh"
  ;;
*)
  echo "Usage: $0 [stream|snapshot]"
  exit 1
  ;;
esac

