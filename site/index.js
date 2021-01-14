import root from "./routes/_root.svelte";
import routes from "./routes/index.js";
import router from "@kwangure/svelte-pagejs-router";

router(root, routes);