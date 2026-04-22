import Plans from "./plan";
import User from "./user";

async function main() {
    console.log("Seeder berjalan...");
    const user = await User();
    console.log("user: ", user);
    const plans = await Plans();
    console.log("plans: ", plans);
    console.log("Seeder selesai!");
}

main();