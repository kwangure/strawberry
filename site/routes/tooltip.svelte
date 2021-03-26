<script>
    import Tooltip from "~@components/Tooltip";
</script>

<Tooltip let:reference>
    <span slot="popup">Yes, Papa. Drop me</span>
    <div class="tooltip" use:reference>
    </div>
</Tooltip>