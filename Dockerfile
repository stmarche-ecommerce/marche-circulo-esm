FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_USERS_V2=""
ARG NEXT_PUBLIC_USERS_V2_API_KEY=""

ENV NEXT_PUBLIC_API_USERS_V2=${NEXT_PUBLIC_API_USERS_V2}
ENV NEXT_PUBLIC_USERS_V2_API_KEY=${NEXT_PUBLIC_USERS_V2_API_KEY}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8080

CMD ["node", "server.js"]
