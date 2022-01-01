#! bin/bash

echo "Running Pre Build"
# if root build exists deleting it
if [ -d "build" ]; then
    rm -r build/
fi
