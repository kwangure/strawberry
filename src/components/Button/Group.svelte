<div class="berry-button-group">
    <slot></slot>
</div>

<style>
    @import "../../css/shared.css";
    .berry-button-group :global(button) {
        border-radius: 0;
    }

    .berry-button-group > :global(button):first-child:not(:last-child), 
    .berry-button-group > :global(span:first-child:not(:last-child) > button) {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .berry-button-group > :global(button):last-child:not(:first-child), 
    .berry-button-group > :global(span:last-child:not(:first-child) > button) {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .berry-button-group :global(button + button), 
    :global(button) + .berry-button-group, 
    .berry-button-group :global(span + button), 
    .berry-button-group :global(button + span) , .berry-button-group > :global(span + span), 
    .berry-button-group + :global(button), 
    .berry-button-group + .berry-button-group {
        margin-left: -1px;
    }
    
    .berry-button-group > :global(button), .berry-button-group > :global(span > button) {
        position: relative;
    }

    .berry-button-group > :global(button:hover), 
    .berry-button-group > :global(span > button:hover), 
    .berry-button-group > :global(button:focus), 
    .berry-button-group > :global(span > button:focus), 
    .berry-button-group > :global(button:active), 
    .berry-button-group > :global(span > button:active), 
    .berry-button-group > :global(button.active), 
    .berry-button-group > :global(span > button.active) {
        z-index: 2;
    }
</style>