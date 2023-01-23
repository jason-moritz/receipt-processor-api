FROM node:18-alpine
LABEL maintainer = "Jason Moritz"

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

# DEV
ENV PORT 3000
ENV NODE_ENV development
EXPOSE 3000 3000

# PROD
# ENV PORT production port 
# ENV NODE_ENV production
# EXPOSE production port

CMD ["node", "./server.js"]
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/api/v1/docker-health || exit 1


