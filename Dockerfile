FROM oven/bun:1 AS build
WORKDIR /app
COPY . .
WORKDIR /app/docs
RUN bun install --frozen-lockfile
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:1-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

USER bun

COPY --chown=bun:bun --from=build /app/docs/.next/standalone ./
COPY --chown=bun:bun --from=build /app/docs/.next/static ./docs/.next/static

EXPOSE 3000

CMD ["bun", "docs/server.js"]
