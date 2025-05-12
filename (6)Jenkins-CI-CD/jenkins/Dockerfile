FROM jenkins/jenkins:lts

USER root

# Install prerequisites
RUN apt-get update && apt-get install -y \
    docker.io \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Configure Docker permissions
RUN if ! getent group docker; then groupadd -g 999 docker; fi && \
    usermod -aG docker jenkins && \
    chown -R jenkins:jenkins /var/jenkins_home

# Install Jenkins plugins
RUN jenkins-plugin-cli --plugins \
    workflow-cps \
    git \
    nodejs \
    docker-workflow \
    docker-plugin \
    docker-java-api

# Create init.groovy.d directory and copy Groovy script
RUN mkdir -p /usr/share/jenkins/ref/init.groovy.d
COPY init-job.groovy /usr/share/jenkins/ref/init.groovy.d/init-job.groovy

# Create entrypoint script to set permissions at runtime
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER jenkins

# Environment variables
ENV DOCKER_HOST=unix:///var/run/docker.sock
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]