# Multi-stage build for Holap
FROM node:22-alpine AS builder

WORKDIR /app

# Install client dependencies and build
COPY client/package*.json ./client/
RUN cd client && npm ci --only=production && npm install -g tailwindcss postcss autoprefixer

COPY client/. ./client/
COPY server/. ./server/
COPY package*.json ./

RUN npm ci --only=production && \
    cd client && npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "server/index.js"]