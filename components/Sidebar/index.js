import Sidebar, { docs as sidebarDocs } from "./Sidebar.svelte";
import Item from "./Item.svelte";
import Link from "./Link.svelte";
import Section from "./Section.svelte";

export default Sidebar;
export { Link, Item, Section };

export const docs = {
    main: sidebarDocs,
};
