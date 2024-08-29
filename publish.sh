#!/bin/bash

set -e
set -x

if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    exit 1
fi

VERSION=$1

git checkout master
git pull origin master

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
