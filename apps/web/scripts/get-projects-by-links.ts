import prisma from "@/lib/prisma";
import "dotenv-flow/config";

async function main() {
  const projects = await prisma.project.findMany({
    select: {
      slug: true,
      plan: true,
      linksUsage: true,
      linksLimit: true,
    },
    orderBy: {
      linksUsage: "desc",
    },
    take: 100,
  });
  console.table(projects, ["slug", "plan", "linksUsage", "linksLimit"]);
}

main();
