<script>
    import Icon from "../Icon.svelte";
    import { mdiLoading } from "@mdi/js";

    let className = "";
export { className as class };
    export let color = ""; 
    export let icon = "";
    export let iconProps = {};
    export let active = "";
    export let loading = false;
    export let fullwidth = false;
    
    let slot_used = true;
</script>

<button class="{color? color: ''} {className}" class:icon class:slot_used class:loading class:fullwidth
    class:active on:click on:hover on:mouseover on:mouseout>
    <div class="content-wrapper">
        {#if icon}
            <span class="button-prefix">
                <Icon path={icon} {...iconProps}></Icon>
            </span>
        {/if}
        {#if loading}
            <span class="loading-spinner {loading?'visible':''}">
                <Icon path={ mdiLoading }></Icon>
            </span>
        {/if}
        <slot>{(slot_used = false) || ""}</slot>
    </div>
</button>

<style>
    button {
        line-height: 1.5;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        user-select: none;
        touch-action: manipulation;
        height: 35px;
        padding: 0 10px;
        font-size: 14px;
        border-radius: 4px;
        color: var(--text);
        background-color: transparent;
        border-color: var(--border);
        outline: none;
    }
    button.fullwidth {
        width:100%;
    }
    button .content-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.2;
    }
    button.primary {
        color: var(--white);
        background-color: var(--primary);
        border: none;
    }
    button.primary:active, 
    button.primary:hover {
        color: var(--white);
        background-color: var(--primary);
    }
    button.none {
        border: none;
    }
    button.none:active,
    button.none:hover {
        background-color: var(--primary-light);
        color:  var(--primary);
    }
    .button-prefix {
        display: flex;
        padding-right: 2px;
    }
    button.icon.slot_used {
        padding-right: 16px;
    }
    button.loading {
        cursor: disabled;
    }
    button.loading:after {
        content: ""; 
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--white);
        opacity: .6;
        cursor: disabled;
        z-index: 2;
    }
    .loading-spinner {
        position: absolute;
        display: none;
        top: 50%;
        transform: translateY(-50%);
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        font-size: 22px;
        animation: spin 1s infinite linear;
        color: var(--black);
        z-index: 3;
    }
    @keyframes spin {
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
    }
    .visible {
        display: block;
    }
    button.primary.active,
    button.primary:hover {
        background-color: var(--primary-hover);
        border-color: var(--primary-hover);
    }
    button.active,
    button:hover {
        background-color: var(--grey-light);
        border-color: var(--border-hover);
    }
</style>