<div class="menu-item" on:click>
    <slot/>
</div>

<style>
    .menu-item {
        clear: both;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        white-space: nowrap;
        cursor: pointer;
        transition: all .3s;
        min-width: 130px;
        background-color: #fff;
    }

    .menu-item:not(.linked) {
        padding: 8px 16px;
    }

    .menu-item :global(a) {
        padding: 8px 16px;
        text-decoration: none;
        color: inherit;
    }

    .menu-item:hover {
        color: #1870ff;
        background-color: #deeaff;
    }
</style>