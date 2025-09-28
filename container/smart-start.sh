#!/bin/sh
# smart-start.sh: Detects project type and runs it.

# Change to the application directory
cd /app || exit 1

if [ -f "requirements.txt" ]; then
  echo ">>> Python/FastAPI project detected."
  echo ">>> Installing dependencies from requirements.txt..."
  python3 -m venv venv
  . venv/bin/activate
  pip install -r requirements.txt

  echo ">>> Starting FastAPI server with Uvicorn on port 3000..."
  # Look for main.py or app.py
  if [ -f "main.py" ]; then
    exec uvicorn main:app --host 0.0.0.0 --port 3000 --reload
  elif [ -f "app.py" ]; then
    exec uvicorn app:app --host 0.0.0.0 --port 3000 --reload
  else
    echo "!!! Error: Could not find main.py or app.py to start the server."
    tail -f /dev/null
  fi

elif [ -f "package.json" ]; then
  echo ">>> Node.js project detected."
  echo ">>> Installing dependencies with bun..."
  bun install

  echo ">>> Starting Node.js development server..."
  exec bun run dev

else
  echo "!!! No recognizable project type found (no requirements.txt or package.json)."
  # Keep the container running for debugging
  tail -f /dev/null
fi