<div class='br-arrow'/>

<style>
    /*
        To create the arrow we 'cut' (clip) a square along the diagonal, rotate
        it 45 degrees and shift it so that the visible part of the square
        sticks out.
    */
    div {
        position: var(--br-dropdown-popup-position);
        top: var(--br-dropdown-arrow-top);
        left: var(--br-dropdown-arrow-left);
        right: var(--br-dropdown-arrow-right);
        bottom: var(--br-dropdown-arrow-bottom);
        background-color: inherit;
        height: var(--br-dropdown-arrow-height);
        width: var(--br-dropdown-arrow-width);
        transform: rotate(var(--rotate));
        clip-path: polygon(0 0, 0% 100%, 100% 100%);
		border-radius: 0 4px;
        box-shadow: inherit;
    }
    div {
        /*
            When custom property has whitespace it becomes the active value.
            For your amusement, read https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property
        */
        --rotate-top: var(--br-dropdown-arrow-side-top) 315deg;
        --rotate-bottom: var(--br-dropdown-arrow-side-bottom) 135deg;
        --rotate-left: var(--br-dropdown-arrow-side-left) 225deg;
        --rotate-right: var(--br-dropdown-arrow-side-right) 45deg;
        --rotate: var(--rotate-top, var(--rotate-bottom, var(--rotate-left, var(--rotate-right))));
    }
</style>