import Input from "./Input.svelte";
import Checkbox  from "./Checkbox.svelte";
import Number from "./Number.svelte";
import Password  from "./Password.svelte";
import Radio from "./Radio.svelte";
import Textarea from "./Textarea.svelte";

Input.Checkbox = Checkbox;
Input.Number = Number;
Input.Password = Password;
Input.Radio = Radio;
Input.Text = Textarea;

export default Input;