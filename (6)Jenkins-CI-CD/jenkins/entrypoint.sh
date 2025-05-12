#!/bin/bash

# Set permissions on mounted docker.sock
if [ -S /var/run/docker.sock ]; then
    sudo chown root:docker /var/run/docker.sock
    sudo chmod 660 /var/run/docker.sock
fi

# Run original Jenkins entrypoint
exec /usr/local/bin/jenkins.sh "$@"