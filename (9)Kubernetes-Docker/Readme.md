# Practical 8: Integration of Kubernetes and Docker

This practical demonstrates how to deploy a Node.js web application using Docker and Kubernetes on a Windows machine. The application is containerized with Docker and deployed to a local Kubernetes cluster using Minikube. It assumes you have already written the necessary code (Node.js application, Dockerfile, and Kubernetes manifests) as part of Practical 8. This guide focuses on setting up the environment, building, deploying, and testing the application, using `winget` to install required tools.

## Objective

- Set up a local Kubernetes cluster using Minikube.
- Build and containerize a Node.js application with Docker.
- Deploy the application to Kubernetes and access it via a browser.
- Clean up the environment after testing.

## Prerequisites

- **Docker Desktop** installed and running (with Kubernetes disabled to avoid conflicts with Minikube).
- Windows with `winget` available for tool installation.
- Code from Practical 8 already written, including:
  - `app.js`: Node.js application using Express to serve a webpage.
  - `package.json`: Node.js project configuration.
  - `Dockerfile`: Instructions to containerize the Node.js app.
  - `k8s-deployment.yaml`: Kubernetes manifests for deployment and service.

## Step 1: Install Required Tools

Use `winget` to install Minikube, kubectl, and Node.js (if not already installed). Open a terminal (e.g., PowerShell or Command Prompt) and run:

```bash
winget install -e --id Kubernetes.minikube
winget install -e --id Kubernetes.kubectl
winget install -e --id OpenJS.NodeJS
```

Verify the installations:

```bash
minikube version
kubectl version --client
node --version
npm --version
```

## Step 2: Verify Your Code

Ensure the following files from Practical 8 are in your project directory (e.g., `node-k8s-demo`):

1. **app.js**: A Node.js application using Express, serving a simple webpage (e.g., "Hello from Node.js running in Kubernetes!") on port 3000.
2. **package.json**: Configured with dependencies (e.g., `express`).
3. **Dockerfile**: Defines how to build the Docker image (based on `node:18`, installs dependencies, copies code, exposes port 3000).
4. **k8s-deployment.yaml**: Contains a Kubernetes Deployment (e.g., 3 replicas) and a Service (e.g., LoadBalancer type, mapping port 80 to 3000).

If any files are missing, ensure they match the expected structure for a Node.js app, Docker container, and Kubernetes deployment.

## Step 3: Install Node.js Dependencies

Navigate to your project directory and install dependencies:

```bash
cd node-k8s-demo
npm install
```

Test the Node.js app locally (optional):

```bash
node app.js
```

Visit `http://localhost:3000` in a browser to confirm the app works. Stop the server with `Ctrl+C`.

## Step 4: Build the Docker Image

Build the Docker image using your Dockerfile:

```bash
docker build -t node-k8s-demo:latest .
```

Test the Docker container locally:

```bash
docker run -p 3000:3000 node-k8s-demo:latest
```

Verify the app is accessible at `http://localhost:3000`. Stop the container with `Ctrl+C`.

## Step 5: Set Up Minikube

Start a local Kubernetes cluster with Minikube:

```bash
minikube start
```

Enable the Minikube registry to store the Docker image locally:

```bash
minikube addons enable registry
```

Tag and push the Docker image to the Minikube registry:

```bash
& minikube -p minikube docker-env | Invoke-Expression
docker build -t node-k8s-demo:latest .
```

## Step 6: Deploy to Kubernetes

Deploy your application using the Kubernetes manifests:

```bash
kubectl apply -f k8s-deployment.yaml
```

Verify the deployment:

```bash
kubectl get pods
kubectl get services
```

Ensure the pods are in the `Running` state and the service (`node-k8s-demo-service`) is created.

## Step 7: Access the Application

Expose the service to access it outside the cluster:

```bash
minikube service node-k8s-demo-service --url
```

Copy the provided URL and open it in a browser. You should see the message from your Node.js app (e.g., "Hello from Node.js running in Kubernetes!").

## Step 8: Verify Kubernetes Integration

Check the number of replicas and pod distribution:

```bash
kubectl get deployments
kubectl describe deployment node-k8s-demo
```

Scale the deployment to demonstrate Kubernetes orchestration (optional):

```bash
kubectl scale deployment node-k8s-demo --replicas=5
kubectl get pods
```

Observe that Kubernetes creates additional pods to meet the new replica count.

## Step 9: Clean Up

After testing, stop and delete the Minikube cluster:

```bash
minikube stop
minikube delete
```

Optionally, remove the Docker image:

```bash
docker rmi node-k8s-demo:latest
docker rmi localhost:5000/node-k8s-demo:latest
```
