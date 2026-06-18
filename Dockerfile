# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

ARG GIT_BRANCH=unknown
ARG GIT_VERSION=unknown
ARG GIT_LAST_COMMIT_TIME=unknown
ARG GIT_IS_DIRTY=false
ARG GIT_COMMIT_HASH=unknown

ENV GIT_BRANCH=$GIT_BRANCH \
    GIT_VERSION=$GIT_VERSION \
    GIT_LAST_COMMIT_TIME=$GIT_LAST_COMMIT_TIME \
    GIT_IS_DIRTY=$GIT_IS_DIRTY \
    GIT_COMMIT_HASH=$GIT_COMMIT_HASH

RUN npm install -g pnpm@9.15.9

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# ── Stage 2: Production ──────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    PORT=80 \
    HOST=0.0.0.0 \
    TZ=Asia/Taipei

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80

CMD ["node", "build/index.js"]
