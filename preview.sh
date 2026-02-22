#!/usr/bin/env bash
# =============================================================================
# Heartland Animal Shelter — Local Preview Script (Mac / Linux)
# =============================================================================
# This script automates everything needed to run the site locally:
#   1. Checks for required tools (Node.js, Git)
#   2. Installs pnpm if not already installed
#   3. Clones the repo if running from outside the project folder
#   4. Installs all dependencies
#   5. Starts the development server
#   6. Opens the site in your default browser
#
# Usage:
#   chmod +x preview.sh   (first time only — makes the script executable)
#   ./preview.sh
# =============================================================================

set -e

REPO_URL="https://github.com/danielle-creator/heartland-animal-shelter.git"
REPO_DIR="heartland-animal-shelter"
PORT=3000
SITE_URL="http://localhost:${PORT}"
ADMIN_URL="http://localhost:${PORT}/admin"

# ── Colours ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

print_header() {
  echo ""
  echo -e "${CYAN}${BOLD}=============================================${RESET}"
  echo -e "${CYAN}${BOLD}  Heartland Animal Shelter — Local Preview  ${RESET}"
  echo -e "${CYAN}${BOLD}=============================================${RESET}"
  echo ""
}

print_step() {
  echo -e "${YELLOW}▶ $1${RESET}"
}

print_ok() {
  echo -e "${GREEN}✔ $1${RESET}"
}

print_error() {
  echo -e "${RED}✖ ERROR: $1${RESET}"
}

# ── Step 1: Check Node.js ─────────────────────────────────────────────────────
print_header
print_step "Checking for Node.js..."

if ! command -v node &>/dev/null; then
  print_error "Node.js is not installed."
  echo ""
  echo "  Please install Node.js from: https://nodejs.org"
  echo "  Download the LTS version, install it, then run this script again."
  echo ""
  exit 1
fi

NODE_VERSION=$(node -v)
print_ok "Node.js found: ${NODE_VERSION}"

# ── Step 2: Check Git ─────────────────────────────────────────────────────────
print_step "Checking for Git..."

if ! command -v git &>/dev/null; then
  print_error "Git is not installed."
  echo ""
  echo "  Please install Git from: https://git-scm.com/downloads"
  echo "  Then run this script again."
  echo ""
  exit 1
fi

print_ok "Git found: $(git --version)"

# ── Step 3: Install pnpm if needed ───────────────────────────────────────────
print_step "Checking for pnpm..."

if ! command -v pnpm &>/dev/null; then
  echo "  pnpm not found — installing now..."
  npm install -g pnpm
  print_ok "pnpm installed successfully."
else
  print_ok "pnpm found: $(pnpm -v)"
fi

# ── Step 4: Clone or update the repo ─────────────────────────────────────────
# Detect if we're already inside the project directory
if [ -f "package.json" ] && grep -q "heartland-animal-shelter" package.json 2>/dev/null; then
  print_ok "Already inside the project directory."
elif [ -d "${REPO_DIR}" ]; then
  print_step "Project folder found — pulling latest changes from GitHub..."
  cd "${REPO_DIR}"
  git pull origin main
  print_ok "Repository updated."
else
  print_step "Cloning repository from GitHub..."
  git clone "${REPO_URL}"
  cd "${REPO_DIR}"
  print_ok "Repository cloned successfully."
fi

# ── Step 5: Install dependencies ─────────────────────────────────────────────
print_step "Installing dependencies (this may take a minute on first run)..."
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
print_ok "Dependencies installed."

# ── Step 6: Create .env if it doesn't exist ──────────────────────────────────
if [ ! -f ".env" ]; then
  print_step "Creating local .env configuration..."
  cat > .env <<EOF
NODE_ENV=development
PORT=${PORT}
VITE_APP_ID=heartland-animal-shelter
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
EOF
  print_ok ".env file created."
fi

# ── Step 7: Start the dev server ─────────────────────────────────────────────
print_step "Starting the development server..."
echo ""
echo -e "  ${BOLD}Site URL:${RESET}   ${CYAN}${SITE_URL}${RESET}"
echo -e "  ${BOLD}Admin URL:${RESET}  ${CYAN}${ADMIN_URL}${RESET}"
echo ""
echo -e "  Press ${BOLD}Ctrl + C${RESET} to stop the server."
echo ""

# Open browser after a short delay (background process)
(
  sleep 4
  if command -v open &>/dev/null; then
    open "${SITE_URL}"          # macOS
  elif command -v xdg-open &>/dev/null; then
    xdg-open "${SITE_URL}"      # Linux
  fi
) &

# Start the server (foreground)
pnpm dev
