# Build React app
FROM node:20-alpine AS build

# Limit Node memory usage (VERY IMPORTANT for t3.micro)
ENV NODE_OPTIONS="--max-old-space-size=512"

WORKDIR /app

COPY package*.json ./

# Install dependencies safely
RUN npm install --legacy-peer-deps

COPY . .

# Build production version
RUN npm run build

# Serve with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]