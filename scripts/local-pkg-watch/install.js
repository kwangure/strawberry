import { exec as _exec } from "child_process";
import util from "util";

const exec = util.promisify(_exec);

export default async function install(pkg, dev) {
    const flags = dev ? "-D" : "";
    const installCmd = `npm install ${flags} ${pkg}`;
    console.log(installCmd);
    const { stdout, stderr } = await exec(installCmd);
    console.log(stdout);
    console.log(stderr);
}
