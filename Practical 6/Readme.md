# Docker Commands for Content Management with NGINX

This guide covers Docker commands for managing content using the NGINX web server, including pulling the NGINX image, running a container to serve a UI, and building a custom NGINX image.

## 1. Pulling the NGINX Image

NGINX is a lightweight web server that can serve static content and provide a simple UI for content management.

```bash
docker pull nginx:latest
```

- **Purpose**: Downloads the latest NGINX image from Docker Hub.
- **Why**: The `nginx:latest` image is stable and suitable for serving web content.

## 2. Running an NGINX Container

Run a container to serve a basic web UI using NGINX.

```bash
docker run -d -p 8080:80 --name nginx-web nginx:latest
```

- **Flags**:
  - `-d`: Runs the container in detached mode.
  - `-p 8080:80`: Maps port 8080 on the host to port 80 in the container.
  - `--name nginx-web`: Names the container for easy reference.
- **Access**: Open `http://localhost:8080` in a browser to see the default NGINX welcome page.

### Mounting Content

To serve custom content, mount a local directory to the container's HTML directory.

```bash
docker run -d -p 8080:80 --name nginx-web -v $(pwd)/html:/usr/share/nginx/html:ro nginx:latest
```

- **`-v $(pwd)/html:/usr/share/nginx/html:ro`**: Mounts the local `./html` directory to NGINX’s default content directory in read-only mode.
- **Usage**: Place your `index.html` or other static files in the local `./html` directory to serve them.

## 3. Building a Custom NGINX Image

Create a custom NGINX image with pre-configured content.

### Step 1: Create a Dockerfile

```Dockerfile
FROM nginx:latest
COPY ./html /usr/share/nginx/html
```

- **FROM**: Uses the latest NGINX image as the base.
- **COPY**: Copies the local `./html` directory to the container’s HTML directory.

### Step 2: Create Sample Content

Create a directory named `html` and add an `index.html` file:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My NGINX UI</title>
  </head>
  <body>
    <h1>Welcome to My Content Management UI</h1>
    <p>This is served by NGINX via Docker.</p>
  </body>
</html>
```

### Step 3: Build the Image

```bash
docker build -t my-nginx-ui:latest .
```

- **`-t my-nginx-ui:latest`**: Tags the image as `my-nginx-ui:latest`.
- **`.`**: Specifies the build context (current directory).

### Step 4: Run the Custom Image

```bash
docker run -d -p 8080:80 --name custom-nginx my-nginx-ui:latest
```

- **Access**: Visit `http://localhost:8080` to see your custom UI.

## 4. Managing Containers

- **List Running Containers**:

  ```bash
  docker ps
  ```

- **Stop a Container**:

  ```bash
  docker stop nginx-web
  ```

- **Remove a Container**:

  ```bash
  docker rm nginx-web
  ```

- **View Logs**:
  ```bash
  docker logs nginx-web
  ```

## 5. Content Management Tips

- **Dynamic Updates**: Update files in the mounted `./html` directory to reflect changes in real-time.
- **Scaling**: Use Docker Compose or orchestration tools like Kubernetes for multi-container setups.
- **Security**: Use `:ro` for read-only mounts and avoid exposing unnecessary ports.
