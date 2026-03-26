#!/usr/bin/env bash
#
# fov — local cheat sheet (Bun + One + Tamagui + mobile).
# Run from this directory: ./help.sh   or   ./help.sh mobile
#
# ─── Adding a section ─────────────────────────────────────────────────────────
# 1. Add a function: section_mytopic() { ... }
# 2. Call it from section_all() in the order you want.
# 3. Add a case arm in main() for: ./help.sh mytopic
# 4. Add the topic name to section_topics() for ./help.sh topics
# ─────────────────────────────────────────────────────────────────────────────

section_banner() {
  printf '%s\n' ""
  printf '%s\n' "🍱 fov — Takeout-style stack (One · Tamagui · Bun)"
  printf '%s\n' "   Run this script from the fov/ root."
  printf '%s\n' ""
}

section_quickstart() {
  printf '%s\n' "🚀 Quick start"
  printf '%s\n' "  bun install              deps"
  printf '%s\n' "  bun backend              Docker: postgres + Zero (see README for ports)"
  printf '%s\n' "  bun dev                  web + mobile dev server → http://localhost:8092"
  printf '%s\n' "  bun migrate              run once backend is up (needed for auth/data changes)"
  printf '%s\n' ""
}

section_daily() {
  printf '%s\n' "📅 Daily dev"
  printf '%s\n' "  bun dev                  main loop + auto stream logging"
  printf '%s\n' "  bun dev:no-logs          same dev loop, no auto stream logging"
  printf '%s\n' "  Env: .env + .env.development (used by bun run env:dev … scripts)"
  printf '%s\n' "  JS/TS only → save files; no prebuild needed."
  printf '%s\n' "  Auth/demo login needs bun backend running; otherwise /api/auth can return 500."
  printf '%s\n' "  ⚠️  Don’t use dev-server “open iOS” (e.g. oi) if it opens exp:// — that’s Expo Go."
  printf '%s\n' "      Use bun ios in another terminal (dev client). See docs/unstuck/expo-go-nitro-dev-client.md"
  printf '%s\n' ""
}

section_mobile() {
  printf '%s\n' "📱 Mobile (dev client — not Expo Go)"
  printf '%s\n' "  bun ios                  iOS simulator + dev client"
  printf '%s\n' "  bun android              Android emulator + dev client"
  printf '%s\n' "  bun prebuild:native      after app.config / native plugins / some deps change"
  printf '%s\n' "  ⚠️  Expo Go won’t work here (Nitro / native modules). Use dev build."
  printf '%s\n' "  If Metro says Opening exp://… you’re in Expo Go — run bun ios / bun android instead."
  printf '%s\n' "  If bun ios fails on simctl openurl (code 115): docs/unstuck/ios-simctl-openurl-115.md"
  printf '%s\n' ""
}

section_simulators() {
  printf '%s\n' "🖥️  Simulators"
  printf '%s\n' "  iOS:     open -a Simulator   (or Xcode → Open Developer Tool)"
  printf '%s\n' "  Android: Android Studio → Device Manager → start an AVD"
  printf '%s\n' ""
}

section_quality() {
  printf '%s\n' "✨ Code quality"
  printf '%s\n' "  bun check                TypeScript (tko check)"
  printf '%s\n' "  bun lint                 oxlint"
  printf '%s\n' "  bun lint:fix             oxlint + oxfmt fix"
  printf '%s\n' "  bun format               oxfmt"
  printf '%s\n' ""
}

section_tests() {
  printf '%s\n' "🧪 Tests"
  printf '%s\n' "  bun test:unit"
  printf '%s\n' "  bun test:integration"
  printf '%s\n' "  bun test                 unit + integration"
  printf '%s\n' ""
}

section_db() {
  printf '%s\n' "🗄️  DB & Zero"
  printf '%s\n' "  bun migrate              run migrations (needs env:dev)"
  printf '%s\n' "  bun zero:generate        after Zero schema / data shape changes"
  printf '%s\n' ""
}

section_logs() {
  printf '%s\n' "🪵 Logs"
  printf '%s\n' "  bun logs:status          stream lock + pid health"
  printf '%s\n' "  bun logs:stop            stop stream supervisor + children"
  printf '%s\n' "  bun logs:snapshot        one-shot diagnostics capture"
  printf '%s\n' "  bun logs:stream          run stream collector manually"
  printf '%s\n' "  layout: .logs/YYYY-MM-DD/<log-type>/<timestamp>.log"
  printf '%s\n' "  today: .logs/YYYY-MM-DD/index.md   latest pointer: .logs/latest"
  printf '%s\n' "  AI prompt:"
  printf '%s\n' "    Review .logs/latest + today's index.md for ISSUE: <describe symptom>"
  printf '%s\n' "    Return top 3 root-cause leads, confidence, and next 3 checks."
  printf '%s\n' ""
}

section_cleanup() {
  printf '%s\n' "🧹 When builds act weird"
  printf '%s\n' "  bun clean                rm dist, .expo, .docker (see package.json)"
  printf '%s\n' "  cd android && ./gradlew --stop   reset Gradle daemons (wrong JDK, etc.)"
  printf '%s\n' "  Android native reset (if ./gradlew clean fails — CMake codegen/jni):"
  printf '%s\n' "    rm -rf android/app/.cxx android/app/build android/build && bun android"
  printf '%s\n' "  docs/unstuck/android-gradle-clean-cmake.md"
  printf '%s\n' ""
}

section_docs() {
  printf '%s\n' "📚 Docs"
  printf '%s\n' "  docs/unstuck/            Expo Go, JDK 17, Gradle…"
  printf '%s\n' "  docs/tamagui.md          Tamagui / UI theme (src/tamagui/)"
  printf '%s\n' "  docs/zero.md             Zero sync"
  printf '%s\n' ""
}

section_troubleshoot() {
  printf '%s\n' "🩹 Troubleshooting (short)"
  printf '%s\n' "  Metro wrong / main not registered → often native load failed; see docs/unstuck/"
  printf '%s\n' "  Android: AGP needs JDK 17+ → JAVA_HOME + ./gradlew --stop"
  printf '%s\n' ""
}

section_topics() {
  printf '%s\n' "📋 Topics: ./help.sh [topic]"
  printf '%s\n' "  all (default)  quickstart  daily  mobile  sim  quality  tests  db  logs  clean  docs  troubleshoot  topics"
  printf '%s\n' ""
}

section_all() {
  section_banner
  section_quickstart
  section_daily
  section_mobile
  section_simulators
  section_quality
  section_tests
  section_db
  section_logs
  section_cleanup
  section_docs
  section_troubleshoot
  section_topics
}

usage() {
  printf '%s\n' "Usage: ./help.sh [topic]"
  section_topics
}

main() {
  case "${1:-}" in
    "" | all)
      section_all
      ;;
    quickstart | quick)
      section_banner
      section_quickstart
      ;;
    daily | dev)
      section_banner
      section_daily
      ;;
    mobile)
      section_banner
      section_mobile
      section_simulators
      ;;
    sim | simulators)
      section_banner
      section_simulators
      ;;
    quality | lint)
      section_banner
      section_quality
      ;;
    tests | test)
      section_banner
      section_tests
      ;;
    db | database | zero)
      section_banner
      section_db
      ;;
    logs | log)
      section_banner
      section_logs
      ;;
    clean | cleanup)
      section_banner
      section_cleanup
      ;;
    docs)
      section_banner
      section_docs
      ;;
    troubleshoot | tshoot | fix)
      section_banner
      section_troubleshoot
      section_docs
      ;;
    topics | help | -h | --help)
      section_banner
      usage
      ;;
    *)
      section_banner
      printf '%s\n' "Unknown topic: $1"
      printf '%s\n' ""
      usage
      ;;
  esac
}

main "$@"
