#!/bin/bash

set -e
set -x

if ! command -v gh &>/dev/null; then
    echo "Error: GitHub CLI (gh) is not installed."
    echo "Please install gh using the following command on macOS:"
    echo "brew install gh"
    exit 1
fi

if ! command -v jq &>/dev/null; then
    echo "Error: jq is not installed."
    echo "Please install jq using the following command on macOS:"
    echo "brew install jq"
    exit 1
fi

REQUIRED_NODE_VERSION="v16.10."
NODE_VERSION=$(node -v)
if [[ $NODE_VERSION != $REQUIRED_NODE_VERSION* ]]; then
    echo "Error: Node.js version must be $REQUIRED_NODE_VERSION.x"
    echo "Please use the following command to switch Node.js version:"
    echo "nvm use v16.10.0"
    exit 1
fi

RAW_VERSION=$(jq -r '.version' package.json)
if [ -z "$RAW_VERSION" ]; then
    echo "Error: Unable to read version from package.json"
    exit 1
fi

VERSION="v$RAW_VERSION"

REPO="sat20-labs/extension"
ZIP_FILE="dist/sat20-chrome-mv3-$VERSION.zip"

git checkout master
git pull origin master

if [ ! -f "$ZIP_FILE" ]; then
    yarn build:chrome:mv3

    if [ ! -f "$ZIP_FILE" ]; then
        echo "Error: File $ZIP_FILE does not exist."
        exit 1
    fi
else
    echo "File $ZIP_FILE already exists, skipping build process."
fi

git add .
if ! git diff-index --quiet HEAD; then
    git commit -m "feature: publish.sh for create tag"
    git push
else
    echo "No changes to commit, skipping git commit and push."
fi

if git rev-parse "$VERSION" >/dev/null 2>&1; then
    echo "Local tag $VERSION already exists. Deleting it..."
    git tag -d "$VERSION"
fi

if git ls-remote --tags origin | grep -q "refs/tags/$VERSION"; then
    echo "Remote tag $VERSION already exists. Deleting it..."
    git push origin --delete "$VERSION"
fi

git tag "$VERSION"
git push origin "$VERSION"

echo "Tag $VERSION created and pushed to origin."

gh release create "$VERSION" --repo "$REPO" --title "Release $VERSION" --notes "Release notes for $VERSION"

gh release upload "$VERSION" "$ZIP_FILE" --repo "$REPO"
echo "File $ZIP_FILE uploaded to release $VERSION."
