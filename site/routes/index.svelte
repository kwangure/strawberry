<script>
    import Checkbox, { Group as CheckboxGroup } from "~@components/Input/Checkbox";
    import Dropdown, { Item } from "~@components/Dropdown";
    import Input, { Number, Password } from "~@components/Input";
    import Radio, { Group as RadioGroup } from "~@components/Input/Radio";
    import Select, { Option } from "~@components/Select";
    import Sidebar, { Item as SidebarItem } from "~@components/Sidebar";
    import { browser } from "$app/env"; // eslint-disable-line import/no-unresolved
    import Button from "~@components/Button";
    import Icon from "~@components/Icon";
    import { mdiClose } from "@mdi/js";
    import Modal from "~@components/Modal";
    import Notification from "~@components/Notification";
    import Tooltip from "~@components/Tooltip";

    let radioValue = "";
    let checkboxFruits = [];
    let visible = false;
</script>

<div class="components">
    <div class="left">
        <Sidebar>
            <SidebarItem>Sidebar Item 1</SidebarItem>
            <SidebarItem active on:click={() => {
 visible = true;
}}>
                Launch modal here! Click!!
            </SidebarItem>
            <SidebarItem>Blastoff!</SidebarItem>
        </Sidebar>
    </div>
    <div class="right">
        <Tooltip let:reference>
            <span slot="popup">Yes, Papa. Drop me</span>
            <div class="tooltip" use:reference>
                {#if browser}
                    <Dropdown>
                        <slot slot="button">
                            <Button>
                                <Icon path={mdiClose}/>
                                Hover me. Tooltip me! Click me. Drop me!
                            </Button>
                        </slot>
                        <Item>Purple.</Item>
                        <Item>Penguin.</Item>
                        <Item>Has.</Item>
                        <Item>Dropped.</Item>
                    </Dropdown>
                {/if}
            </div>
        </Tooltip>
        <Input placeholder="Write me! I'm text input">
            <span slot="label">Write me! I'm text input</span>
        </Input>
        <Number placeholder="Count me! I'm number input">
            <span slot="label">Count me! I'm number input</span>
        </Number>
        <RadioGroup bind:value={radioValue}>
            <Radio value="chill">
                <span slot="label">Listen to me! I'm radio</span>
            </Radio>
            <Radio value="crae-crae">
                <span slot="label">LISTEN TO ME! I'M RADIO</span>
            </Radio>
        </RadioGroup>
        {#if radioValue}
            <div>
                {radioValue}: Awww! You're listening! 😍
            </div>
        {/if}
        <Checkbox value="checkie">
            <span slot="label">Check me out! I'm checkbox</span>
        </Checkbox>
        <CheckboxGroup bind:group={checkboxFruits}>
            <div>I like:</div>
            <Checkbox value="mango">
                <span slot="label">Mango</span>
            </Checkbox>
            <Checkbox value="nothing else">
                <span slot="label">Nothing else</span>
            </Checkbox>
            <div>
                {#if checkboxFruits.length == 1}
                    I like {checkboxFruits[0]}
                {:else if checkboxFruits.length > 1}
                    I like {checkboxFruits[0]}, {checkboxFruits[0]} and {checkboxFruits[1]}!
                {/if}
            </div>
        </CheckboxGroup>
        <Password placeholder="Steal me! I'm password">
            <span slot="label">Steal me! I'm password</span>
        </Password>
        {#if browser}
            <Select placeholder="Like I said..." label="Pick me! I'm smart.">
                <Option value={"testicle"}>Testicle Rainbow</Option>
            </Select>
        {/if}
        <Notification message="Prepare yee the way!"></Notification>
        <Modal bind:visible>
            <span slot="content">
                <div class="modal-content">
                    I am a modal. Hear me cry!
                </div>
                <Button on:click={() => visible = false} primary fullwidth>
                    Close me!
                </Button>
            </span>
        </Modal>
    </div>
</div>

<style>
    .components {
        display: grid;
        grid-template-columns: 240px 1fr;
        grid-template-rows: 1fr;
    }
    .right {
        padding: 10px;
    }
    .right > :global(*:not(.berry-modal):not(.berry-tooltip)),
    .modal-content {
        margin-bottom: 10px;
    }
    .tooltip {
        width: fit-content;
    }
</style>