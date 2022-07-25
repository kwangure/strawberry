<script>
    import Code, { css, none } from '$lib/components/code';
    import Dropdown, { Item } from '$lib/components/dropdown';
    import { mdiDotsHorizontal, mdiLinkVariant, mdiOpenInNew } from '@mdi/js';
    import Button from '$lib/components/button';
    import { escape } from 'svelte/internal';
    import Icon from '$lib/components/icon';

    /** @type {any} */
    export let filepath;
    export let propertyDocs;

    $: ({ customProperty, cssDoc, mdnUrl, property, start, syntax } = propertyDocs);
    $: ({ description } = cssDoc || {});
</script>

<h3 id={customProperty}>
    <Button>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a href="#{customProperty}" class="hash">
            <Icon path={mdiLinkVariant}/>
        </a>
    </Button>
    <Code language={css} inline code={customProperty}/>
    <Dropdown>
        <Button slot="button">
            <Icon path={mdiDotsHorizontal}/>
        </Button>
        <svelte:fragment>
            <Item>
                <a href={mdnUrl} target="_blank" title="Opens in new tab">
                    <!-- https://github.com/mdn/yari/blob/03275c42d4d2ec2751f66b8c5fa3306a0c24d100/client/src/assets/mdn-logo.svg -->
                    <svg id="mdn-docs-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 104.2" aria-hidden="true" role="img">
                        <title>MDN {property} property documentation</title>
                        <path fill=currentColor d="M42 .2 13.4 92.3H1.7L30.2.2H42zM52.4.2v92.1H42V.2h10.4zm40.3 0L64.2 92.3H52.5L81 .2h11.7zM103.1.2v92.1H92.7V.2h10.4z"/>
                    </svg>
                    MDN {property} property docs
                    <Icon path={mdiOpenInNew}/>
                </a>
            </Item>
            <Item>
                <a href="https://github.com/kwangure/strawberry/blob/master/{filepath}#L{start.line}" target="_blank" title="Opens in new tab">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
                        <path clip-rule="evenodd" d="M50 5.7C24.9 5.7 4.5 26 4.6 51.2c0 19.6 12.5 36.9 31.1 43.1 2.3.4 3.1-1 3.1-2.2s0-3.9-.1-7.7c-12.6 2.7-15.3-6.1-15.3-6.1-2.1-5.3-5-6.7-5-6.7-4.1-2.9.3-2.8.3-2.8 4.6.3 7 4.7 7 4.7 4.1 6.9 10.6 4.9 13.2 3.8.2-2.3 1.2-4.5 2.9-6.1-10.2-1.1-20.8-5-20.8-22.5-.1-4.5 1.6-8.9 4.7-12.2-.5-1.1-2-5.7.4-12 0 0 3.8-1.2 12.5 4.7 7.4-2 15.3-2 22.8 0 8.7-5.9 12.4-4.7 12.4-4.7 2.5 6.3 1 10.9.5 12 3.1 3.3 4.8 7.7 4.7 12.2 0 17.5-10.6 21.4-20.8 22.4 1.6 1.4 3.1 4.2 3.1 8.4 0 6.1-.1 11-.1 12.4 0 1.2.8 2.6 3.1 2.2 23.8-8 36.6-33.8 28.6-57.6C86.8 18.2 69.5 5.7 50 5.7z" fill="currentColor" fill-rule="evenodd"/>
                    </svg>
                    View on Github
                    <Icon path={mdiOpenInNew}/>
                </a>
            </Item>
            <Item>
                <a href="https://github.dev/kwangure/strawberry/blob/master/{filepath}#L{start.line}" target="_blank" title="Opens in new tab">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
                        <path clip-rule="evenodd" d="M50 5.7C24.9 5.7 4.5 26 4.6 51.2c0 19.6 12.5 36.9 31.1 43.1 2.3.4 3.1-1 3.1-2.2s0-3.9-.1-7.7c-12.6 2.7-15.3-6.1-15.3-6.1-2.1-5.3-5-6.7-5-6.7-4.1-2.9.3-2.8.3-2.8 4.6.3 7 4.7 7 4.7 4.1 6.9 10.6 4.9 13.2 3.8.2-2.3 1.2-4.5 2.9-6.1-10.2-1.1-20.8-5-20.8-22.5-.1-4.5 1.6-8.9 4.7-12.2-.5-1.1-2-5.7.4-12 0 0 3.8-1.2 12.5 4.7 7.4-2 15.3-2 22.8 0 8.7-5.9 12.4-4.7 12.4-4.7 2.5 6.3 1 10.9.5 12 3.1 3.3 4.8 7.7 4.7 12.2 0 17.5-10.6 21.4-20.8 22.4 1.6 1.4 3.1 4.2 3.1 8.4 0 6.1-.1 11-.1 12.4 0 1.2.8 2.6 3.1 2.2 23.8-8 36.6-33.8 28.6-57.6C86.8 18.2 69.5 5.7 50 5.7z" fill="currentColor" fill-rule="evenodd"/>
                    </svg>
                    View in Github Web Editor
                    <Icon path={mdiOpenInNew}/>
                </a>
            </Item>
        </svelte:fragment>
    </Dropdown>
</h3>
<div class="type">
    <Code language={none} code={escape(syntax)}/>
</div>
{#if description}
    <div class="description">
        {description}
    </div>
{/if}

<style>
    h3 {
        display: flex;
        align-items: center;
    }
    h3 {
        --br-button-root-border: none;
        --br-button-root-background-color: transparent;
        --br-button-root-hover-background-color: transparent;
        --br-button-root-font-color: transparent;
        --br-button-root-padding-inline: 5px;
    }
    h3:not(:hover) {
        --br-link-font-color: transparent;
    }
    h3:hover {
        --br-button-root-font-color: inherit;
        --br-button-transition: all 0.25s ease;
    }
    h3:target {
        animation: highlight 2s;
    }
    @keyframes highlight {
        from {
            --br-code-root-background-color: yellow;
            --br-code-root-font-color: black;
        }
        to {
            --br-code-root-background-color: yellow;
            --br-code-root-font-color: black;
        }
    }
    h3 :global(.menu-item) {
        display: contents;
    }
    h3 a:not(.hash) {
        all: inherit;
        display: flex;
        gap: 10px;
        --br-icon-root-height: 20px;
        min-width: 300px;
    }
    h3 > :global(*:first-child) {
        margin-left: -34px;
    }
    svg {
        height: 16px;
    }
    a > :global(*:last-child) {
        margin-left: auto;
    }
</style>