#!/bin/bash

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed"
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "Error: Not authenticated with GitHub CLI"
    echo "Please run: gh auth login"
    exit 1
fi

# Extract owner and repo from git remote URL
REMOTE_URL=$(git remote get-url origin)
OWNER=$(echo $REMOTE_URL | sed -n 's/.*github.com[:/]\([^/]*\).*/\1/p')
REPO=$(echo $REMOTE_URL | sed -n 's/.*github.com[:/][^/]*\/\([^.]*\).*/\1/p')

echo "Enabling GitHub Pages for $OWNER/$REPO..."

# Enable GitHub Pages using gh api
gh api \
  --method POST \
  /repos/$OWNER/$REPO/pages \
  --field "source[branch]=main" \
  --field "build_type=workflow"

# Check if the command was successful
if [ $? -eq 0 ]; then
    echo "GitHub Pages has been enabled successfully!"
    echo "Your site will be available at: https://$OWNER.github.io/$REPO"
else
    echo "Failed to enable GitHub Pages. Please check your GitHub CLI authentication and try again."
fi
