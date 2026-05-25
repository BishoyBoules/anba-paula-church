#!/bin/bash
APP_DIR="/home/anbapola/backend"
JAR="$APP_DIR/anba-paula-backend.jar"
LOG="$APP_DIR/app.log"
PID_FILE="$APP_DIR/app.pid"

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if ps -p "$PID" > /dev/null 2>&1; then
    echo "Already running with PID $PID"
    exit 1
  fi
fi

mkdir -p "$APP_DIR/uploads"

nohup java -jar "$JAR" \
  --spring.config.location="$APP_DIR/application-prod.properties" \
  > "$LOG" 2>&1 &

echo $! > "$PID_FILE"
echo "Started with PID $(cat $PID_FILE). Logs: $LOG"
