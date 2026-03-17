# -------------------------------
# Production stage
# -------------------------------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# 复制构建产物（在 docker build 时通过 --build-arg 或多阶段构建传入）
COPY ./.next ./.next
COPY ./public ./public
COPY ./package.json ./
COPY ./node_modules ./node_modules
COPY ./next.config.js ./next.config.js
COPY ./check-env-variables.js ./check-env-variables.js

# 启动 Next.js
CMD ["npm", "run", "start"]
