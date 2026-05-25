#!/bin/bash
PID_FILE="/home/anbapola/backend/app.pid"

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  kill "$PID" && echo "Stopped PID $PID" && rm "$PID_FILE"
else
  echo "No PID file found — app may not be running"
fi
