FROM node:24-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public/build-time config is inlined (NEXT_PUBLIC_*) or baked into rewrites
# (API_URL), so both must be present at build time: ARG -> ENV before build.
ARG API_URL
ARG NEXT_PUBLIC_SITE_URL
ENV API_URL=$API_URL NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN pnpm build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3010
ENV PORT=3010 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
