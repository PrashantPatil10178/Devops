# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm i --omit=dev

# Copy remaining source files
COPY . .

# Stage 2: Runtime stage
FROM node:20-alpine
WORKDIR /app

# Copy production node_modules and application from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

# Runtime configuration
ENV NODE_ENV=production
USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O /dev/null http://localhost:3000/ || exit 1

CMD ["npm", "start"]