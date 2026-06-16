# syntax=docker/dockerfile:1

# ---- deps: install all deps (incl. dev) for the build ----
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package.json package-lock.json .npmrc ./
# Prisma schema is needed because postinstall runs `prisma generate`.
COPY prisma ./prisma
RUN npm ci --legacy-peer-deps

# ---- builder: produce the Next.js standalone output ----
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build

# ---- prisma-cli: standalone Prisma CLI for `migrate deploy` at runtime ----
FROM node:20-alpine AS prisma-cli
WORKDIR /app/prisma-cli
RUN apk add --no-cache openssl libc6-compat
RUN npm init -y >/dev/null 2>&1 && npm i prisma@6.19.3 >/dev/null 2>&1

# ---- runner: minimal runtime image ----
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# Next.js standalone server + static assets + public dir.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Prisma schema + migrations (for `migrate deploy`) and generated client/engine.
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=prisma-cli /app/prisma-cli ./prisma-cli

RUN mkdir -p public/uploads && chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
