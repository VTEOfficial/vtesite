import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, "schema.prisma"),
  migrate: {
    async adapter() {
      const { neon } = await import("@neondatabase/serverless");
      const { PrismaNeon } = await import("@prisma/adapter-neon");
      const sql = neon(process.env.DIRECT_URL!);
      return new PrismaNeon({ connectionString: process.env.DIRECT_URL });
    },
  },
});
