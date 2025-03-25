#!/bin/bash

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN environment variable is not set"
    echo "Please set it with: export GITHUB_TOKEN=your_token"
    exit 1
fi

# Extract owner and repo from git remote URL
REMOTE_URL=$(git remote get-url origin)
OWNER=$(echo $REMOTE_URL | sed -n 's/.*github.com[:/]\([^/]*\).*/\1/p')
REPO=$(echo $REMOTE_URL | sed -n 's/.*github.com[:/][^/]*\/\([^.]*\).*/\1/p')

echo "Enabling GitHub Pages for $OWNER/$REPO..."

# Create GitHub Pages site using GitHub Actions as source
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/$OWNER/$REPO/pages" \
  -d '{"source":{"branch":"main"},"build_type":"workflow"}'

# Check if the curl command was successful
if [ $? -eq 0 ]; then
    echo "GitHub Pages has been enabled successfully!"
    echo "Your site will be available at: https://$OWNER.github.io/$REPO"
else
    echo "Failed to enable GitHub Pages. Please check your token and try again."
fi
