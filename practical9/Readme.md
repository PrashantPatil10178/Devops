# 🚀 Kubernetes Node.js App Deployment with Minikube

This project demonstrates how to containerize and deploy a simple Node.js application using Docker and Kubernetes on **Minikube** with Docker driver on Windows.

---

## 📦 Prerequisites

Ensure the following tools are installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

---

## 🛠️ Setup Instructions

### 1. Start Minikube

```bash
minikube start
```

```bash
docker build -t omjadhav0170/kube-nodejs-app .
```

```bash
docker push omjadhav0170/kube-nodejs-app
```

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

```bash
kubectl get pods
kubectl get deployments
kubectl get services
```

```bash
kubectl scale deployment nodejs-deployment --replicas=5
```
