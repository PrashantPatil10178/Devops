FROM jenkins/jenkins:lts

USER root
RUN apt-get update && apt-get install -y \
    docker.io \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN usermod -aG docker jenkins

USER jenkins

# Install required plugins: workflow-cps (Pipeline Groovy), git, nodejs, docker-workflow
RUN jenkins-plugin-cli --plugins workflow-cps git nodejs docker-workflow

# Create init.groovy.d directory and copy Groovy script to create a job
RUN mkdir -p /usr/share/jenkins/ref/init.groovy.d
COPY init-job.groovy /usr/share/jenkins/ref/init.groovy.d/init-job.groovy