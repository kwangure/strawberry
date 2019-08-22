<div class="button-group">
    <slot></slot>
</div>

<style>
    .button-group :global(button) {
        border-radius: 0;
    }

    .button-group > :global(button):first-child:not(:last-child), 
    .button-group > :global(span:first-child:not(:last-child) > button) {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .button-group > :global(button):last-child:not(:first-child), 
    .button-group > :global(span:last-child:not(:first-child) > button) {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .button-group :global(button + button), 
    :global(button) + .button-group, 
    .button-group :global(span + button), 
    .button-group :global(button + span) , .button-group > :global(span + span), 
    .button-group + :global(button), 
    .button-group + .button-group {
        margin-left: -1px;
    }
    
    .button-group > :global(button), .button-group > :global(span > button) {
        position: relative;
    }

    .button-group > :global(button:hover), 
    .button-group > :global(span > button:hover), 
    .button-group > :global(button:focus), 
    .button-group > :global(span > button:focus), 
    .button-group > :global(button:active), 
    .button-group > :global(span > button:active), 
    .button-group > :global(button.active), 
    .button-group > :global(span > button.active) {
        z-index: 2;
    }
</style>