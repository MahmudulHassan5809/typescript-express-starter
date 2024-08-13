FROM node:18-alpine

# Create a non-root user and set up permissions
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Set permissions for the application directory
RUN mkdir -p /app/src && chown -R appuser:appgroup /app

USER appuser

COPY --chown=appuser:appgroup package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY --chown=appuser:appgroup . .
RUN npm run build