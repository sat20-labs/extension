#!/bin/bash

set -e
set -x

if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    exit 1
fi

VERSION=$1
REPO="sat20-labs/extension"
ZIP_FILE="dist/sat20-chrome-mv3-$VERSION.zip"

REQUIRED_NODE_VERSION="v16.10."
NODE_VERSION=$(node -v)
if [[ $NODE_VERSION != $REQUIRED_NODE_VERSION* ]]; then
    echo "Error: Node.js version must be $REQUIRED_NODE_VERSION.x"
    exit 1
fi

git checkout master
git pull origin master
yarn build:chrome:mv3

if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: File $ZIP_FILE does not exist."
    exit 1
fi

git add .
git commit -m "feature: publish.sh for create tag"
git push

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
