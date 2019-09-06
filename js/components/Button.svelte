<script>
    import Icon from './Icon.svelte'
    import { mdiLoading } from '@mdi/js'

    let className = ''
	export { className as class }
    export let type = ''
    export let color = '' 
    export let icon = ''
    export let iconProps = {}
    export let active = ''
    export let loading = false
    $: loading
</script>

<svelte:options tag="sb-button"/>

<button class="{color? color: ''} {className}" class:icon class:loading 
    class:active on:click on:hover>
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
        <slot></slot>
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
        color: rgba(0,0,0,0.65);
        background-color: transparent;
        border-color: #d9d9d9;
        outline: none;
    }
    button .content-wrapper {
        display: flex;
        align-items: center;
        line-height: 1.2;
    }
    button.primary {
        color: #fff;
        background-color: #1890ff;
        border: none;
    }
    button.primary:active, 
    button.primary:hover {
        color: #fff;
        background-color: #40a9ff;
    }
    button.none {
        border: none;
    }
    button.none:active,
    button.none:hover {
        background-color: #e8f0fe;
        color: #1967d2;
    }

    .button-prefix {
        display: flex;
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
        background-color: #fff;
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
        color: #444;
        z-index: 3;
    }
    @keyframes spin {
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
    }
    .visible {
        display: block;
    }
    button.active,
    button:hover {
        color: #40a9ff;
        background-color: #fff;
        border-color: #40a9ff;
    }
</style>