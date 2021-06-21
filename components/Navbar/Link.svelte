<script>
    export let href;
</script>

<li>
    <a {href}><slot/></a>
</li>

<style>
    a {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        display: flex;
        align-items: center;
        color: var(--br-grey-dark);
        font-size: 0.875rem;
        padding: 5px 8px;
        border-radius: var(--br-border-radius);
        transition: all 0.5s ease;
    }
    a:hover {
        color: var(--br-white);
        background-color: var(--br-grey-dark);
    }
    @media only screen and (min-width: 500px) {
        a {
            font-size: 1rem;
        }
    }
</style>
