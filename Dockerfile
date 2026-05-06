# Gunakan image node yang ringan
FROM node:18-alpine

# Tentukan direktori kerja
WORKDIR /app

# Salin file package.json dan install dependensi
COPY package*.json ./
RUN npm install --production

# Salin seluruh kode sumber
COPY . .

# Buat folder data agar SQLite bisa menulis file
RUN mkdir -p data

# Ekspos port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "server.js"]