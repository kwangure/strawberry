<script>
    import { Dropdown, Popup } from '$lib/default/dropdown';
    import { mdiDotsHorizontal, mdiLinkVariant } from '@mdi/js';
    import { css } from '$lib/code';

    /** @type {any} */
    export let filepath;
    export let propertyDocs;

    $: ({ customProperty, cssDoc, mdnUrl, property, start } = propertyDocs);
    $: ({ description } = cssDoc || {});
</script>

<div class='property'>
    <a href="#{customProperty}" class="hash">
        <button>
            <svg viewBox="0 0 24 24">
                <path d={mdiLinkVariant} fill="currentColor"/>
            </svg>
        </button>
    </a>
    <code id={customProperty}>
        {#each css(customProperty) as { segment, color }}
            <span class='br-token-{color}'>{segment}</span>
        {/each}
    </code>
    {#if start}
        <Dropdown>
            <button slot="trigger">
                <svg viewBox="0 0 24 24">
                    <path d={mdiDotsHorizontal} fill="currentColor"/>
                </svg>
            </button>
            <Popup>
                <a class='item' href={mdnUrl} target="_blank" title="Opens in new tab" rel=noreferrer>
                    <div class="br-focusable">
                        <!-- https://github.com/mdn/yari/blob/03275c42d4d2ec2751f66b8c5fa3306a0c24d100/client/src/assets/mdn-logo.svg -->
                        <svg id="mdn-docs-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 104.2" aria-hidden="true" role="img">
                            <title>MDN {property} property documentation</title>
                            <path fill=currentColor d="M42 .2 13.4 92.3H1.7L30.2.2H42zM52.4.2v92.1H42V.2h10.4zm40.3 0L64.2 92.3H52.5L81 .2h11.7zM103.1.2v92.1H92.7V.2h10.4z"/>
                        </svg>
                        MDN {property} property docs
                    </div>
                </a>
                <a class='item' href="https://github.com/kwangure/strawberry/blob/master/{filepath}#L{start.line}" target="_blank" rel=noreferrer title="Opens in new tab">
                    <div class="br-focusable">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
                            <path clip-rule="evenodd" d="M50 5.7C24.9 5.7 4.5 26 4.6 51.2c0 19.6 12.5 36.9 31.1 43.1 2.3.4 3.1-1 3.1-2.2s0-3.9-.1-7.7c-12.6 2.7-15.3-6.1-15.3-6.1-2.1-5.3-5-6.7-5-6.7-4.1-2.9.3-2.8.3-2.8 4.6.3 7 4.7 7 4.7 4.1 6.9 10.6 4.9 13.2 3.8.2-2.3 1.2-4.5 2.9-6.1-10.2-1.1-20.8-5-20.8-22.5-.1-4.5 1.6-8.9 4.7-12.2-.5-1.1-2-5.7.4-12 0 0 3.8-1.2 12.5 4.7 7.4-2 15.3-2 22.8 0 8.7-5.9 12.4-4.7 12.4-4.7 2.5 6.3 1 10.9.5 12 3.1 3.3 4.8 7.7 4.7 12.2 0 17.5-10.6 21.4-20.8 22.4 1.6 1.4 3.1 4.2 3.1 8.4 0 6.1-.1 11-.1 12.4 0 1.2.8 2.6 3.1 2.2 23.8-8 36.6-33.8 28.6-57.6C86.8 18.2 69.5 5.7 50 5.7z" fill="currentColor" fill-rule="evenodd"/>
                        </svg>
                        View on Github
                    </div>
                </a>
            </Popup>
        </Dropdown>
    {/if}
</div>
{#if description}
    <div class="description">
        {description}
    </div>
{/if}

<style>
    .property {
        display: flex;
        align-items: center;
        margin-left: -34px;
        gap: var(--br-size-2);
    }
    .property button {
        border: none;
        transition: all 0.25s ease;
        background-color: transparent;
    }
    .property:not(:hover) button {
        color: transparent;
    }
    @keyframes highlight {
        from {
            background-color: var(--br-dark, #444) var(--br-light, hsl(215deg 100% 90%));
        }
        to {
            background-color: var(--br-dark, #444) var(--br-light, hsl(215deg 100% 90%));
        }
    }
    svg {
        height: 16px;
    }
    code {
        padding: 0px;
        font-size: inherit;
    }
    code:target {
        animation: highlight 2s;
    }
</style>