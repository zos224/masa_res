import { PrismaClient } from "@prisma/client";

if (process.env.NODE_ENV === "production") {
    const prisma = new PrismaClient();
}
else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    const prisma = global.prisma;
}

export default prisma;