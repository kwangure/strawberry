// import Autocomplete  from "./Autocomplete";
import Select, { docs as selectDocs } from "./Select.svelte";
import Option from "./Option.svelte";

export default Select;
export { /* Autocomplete,*/ Option };

export const docs = {
    main: selectDocs,
};
