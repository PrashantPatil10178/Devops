# Jenkins Setup Using Docker

This guide provides a simplified method to install and run **Jenkins** using **Docker**, covering the steps up to retrieving the initial admin password.

## Prerequisites

- **Docker**: Ensure Docker is installed (`docker --version` to verify).
- A machine with internet access (Linux, macOS, or Windows).

## Step 1: Pull Jenkins Docker Image

Download the official Jenkins Long-Term Support (LTS) image from Docker Hub.

```bash
docker pull jenkins/jenkins:lts
```

## Step 2: Run Jenkins Container

Start a Jenkins container with persistent storage and exposed ports.

```bash
docker run -d --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

for Powershell

```bash
docker run -d --name jenkins `
  -p 8080:8080 -p 50000:50000 `
  -v ${PWD}\jenkins_home:/var/jenkins_home `
  jenkins/jenkins:lts

```

### Explanation of Command:

- `-d`: Runs the container in detached mode.
- `--name jenkins`: Names the container for easy reference.
- `-p 8080:8080`: Maps the Jenkins web UI port.
- `-p 50000:50000`: Maps the port for Jenkins agents.
- `-v jenkins_home:/var/jenkins_home`: Creates a Docker volume to persist Jenkins configuration and data.

## Step 3: Access Jenkins

1. Open a web browser and navigate to:
   ```
   http://localhost:8080
   ```
2. The Jenkins setup wizard will prompt for an initial admin password.

## Step 4: Retrieve Initial Admin Password

To unlock Jenkins, retrieve the auto-generated admin password from the container.

```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

- Copy the displayed password.
- Paste it into the Jenkins setup wizard to proceed.

## Next Steps

After entering the password, you can:

- Install recommended plugins.
- Create an admin user.
- Complete the Jenkins setup wizard.

For further configuration (e.g., setting up a CI/CD pipeline), refer to additional documentation or guides.
