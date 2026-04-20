import Plans from "./plan";
import User from "./user";

async function main() {
    console.log("Seeder berjalan...");
    await User();
    await Plans();
    console.log("Seeder selesai!");
}

main();