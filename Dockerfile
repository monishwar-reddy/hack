# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files for the entire monorepo
COPY package.json package-lock.json ./
COPY apps/frontend/package.json ./apps/frontend/
# Add other apps if they are dependencies
# COPY apps/bff/package.json ./apps/bff/

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build time
ENV NEXT_TELEMETRY_DISABLED 1
ENV GOOGLE_API_KEY=

# Build the frontend workspace
RUN npm run build --workspace frontend

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

USER nextjs

EXPOSE 3000
ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "apps/frontend/server.js"]
