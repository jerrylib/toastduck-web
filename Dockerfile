# ---------- deps ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

# ---------- build ----------
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_PAYPAL_CLIENT_ID
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- production ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 8000
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/check-env-variables.js ./check-env-variables.js
CMD ["npm", "run", "start"]
