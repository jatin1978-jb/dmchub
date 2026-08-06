const { execSync } = require('child_process');

process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";
process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "dmchub-secret-key-12345";
if (process.env.RENDER_EXTERNAL_URL) {
  process.env.NEXTAUTH_URL = process.env.RENDER_EXTERNAL_URL;
} else if (process.env.NODE_ENV === "production") {
  process.env.NEXTAUTH_URL = "https://dmchub.onrender.com";
}

console.log("----------------------------------------");
console.log("Starting Build Initialization...");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("----------------------------------------");

try {
  console.log("1. Running Prisma Generate...");
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });
} catch (e) {
  console.error("Prisma generate failed:", e.message);
}

try {
  console.log("2. Running Prisma DB Push...");
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', env: process.env });
} catch (e) {
  console.error("Prisma DB push failed:", e.message);
}

try {
  console.log("3. Running Database Seed...");
  execSync('node prisma/seed.mjs', { stdio: 'inherit', env: process.env });
} catch (e) {
  console.error("Prisma seed failed:", e.message);
}

console.log("Build Initialization Complete.");
console.log("----------------------------------------");
