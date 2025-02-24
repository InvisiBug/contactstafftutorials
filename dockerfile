# FROM node:20-alpine as builder
FROM node as builder

WORKDIR /app
COPY . .



RUN npm install
RUN npm run build

# # FROM --platform=linux/arm64 arm64v8/nginx
# FROM nginx
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf  /etc/nginx/conf.d
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]
