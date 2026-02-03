FROM node:20-bullseye-slim

WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

EXPOSE 3000

CMD ["sh", "-c", "if [ ! -d node_modules ] || [ -z \"$(ls -A node_modules)\" ]; then npm install --legacy-peer-deps; fi && node node_modules/vite/bin/vite.js"]
