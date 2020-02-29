# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.15.4](https://github.com/deimimi/strawberry/compare/v0.15.3...v0.15.4) (2020-02-29)

### Chores

* upgrade Svelte

### Bug Fixes

* use unique placeholder attr in autocomplete select ([a130202](https://github.com/deimimi/strawberry/commit/a13020296f58b89d4a490f32e4ebb58db0ea6113))

### [0.15.3](https://github.com/deimimi/strawberry/compare/v0.15.2...v0.15.3) (2020-02-27)

### [0.15.2](https://github.com/deimimi/strawberry/compare/v0.15.1...v0.15.2) (2020-02-27)

### Features

* add borders to list item ([49e9e43](https://github.com/deimimi/strawberry/commit/49e9e43238ce7a0094b258542e9ba1a9a7a884f5))
* add option for custom icon paths ([66d56c6](https://github.com/deimimi/strawberry/commit/66d56c6106fdea2a860209c940a782e4680394f0))
* add path component to icon ([a98742b](https://github.com/deimimi/strawberry/commit/a98742b4c1b9bf9b59a5ddedf6f8050d9210847a))
* add rotate prop to icon ([34bac81](https://github.com/deimimi/strawberry/commit/34bac81b4da867408223b2b45f41f9c05086f305))
* add selectable list component ([2034994](https://github.com/deimimi/strawberry/commit/203499410ac72651ec603839b5cb5cbc13d56871))
* add support for dynamic icon units ([c782222](https://github.com/deimimi/strawberry/commit/c7822223adbef50f3b156453efc05180cdc3a491))


### Bug Fixes

* allow embeded lists or lists= stopPropagation ([a0f6ec7](https://github.com/deimimi/strawberry/commit/a0f6ec7a0649d206f46f34fc45a46ff6aa05387c))
* avoid dirtifying external data ([20cb1cc](https://github.com/deimimi/strawberry/commit/20cb1cc7ed602ef7067f3bd95561f9a8ec0eb65d))
* cleanly export config bundling config ([34f96f2](https://github.com/deimimi/strawberry/commit/34f96f278d62ccf9f035f14e0c0648184f7211e3))
* correct border-radius styling ([a80ac75](https://github.com/deimimi/strawberry/commit/a80ac750561ca8929a0069fdc7040ca4e99f40ae))
* deselect all list items onDestroy regression ([64ba0e8](https://github.com/deimimi/strawberry/commit/64ba0e89a23e6047f2bf6626f94a3e0ee81144d3))
* export all components ([74a9c2b](https://github.com/deimimi/strawberry/commit/74a9c2b4cfa0226a80ffd968873e0af9ecb72a60))
* export preprocessConfig ([cd47680](https://github.com/deimimi/strawberry/commit/cd47680b94795db6c4a5d1f988cd200d99e50c8b))
* improve modal header styling ([98ceb10](https://github.com/deimimi/strawberry/commit/98ceb106a10a46222c94769220c6a6d1c89bd895))
* prevent css button hover overwrite ([0a09e83](https://github.com/deimimi/strawberry/commit/0a09e837da23897538f184dcf1ec788c65d368e3))
* prevent shifting up and down ([4c09d83](https://github.com/deimimi/strawberry/commit/4c09d83765504558a56bf32fff06f2152a7c91e1))
* remove event listeners when list is destroyed ([17b8400](https://github.com/deimimi/strawberry/commit/17b8400a6e1188d89227fa0fa0b0cd5f7206961e))
* round focus-ring on list item ([1c3b10d](https://github.com/deimimi/strawberry/commit/1c3b10d14239744eaeaa4a136a937277a4405239))
* use consistent button styles ([f1aa124](https://github.com/deimimi/strawberry/commit/f1aa12492475aa13bbc931aa8512d44dcb8dfa77))

# 0.15.1
* fix: fix broken css in Input components. Heaven knows strawberry need tests.

# 0.15.0
This release has a lot more changes than previous ones. Here are a few notable ones:
* feat: add ability for compiling to custom-elements
* feat: add a select component
* feat: add a notification component
* feat: add a steps/progress component for forms
* feat: add a preprocess
* fix: make all input styles more consistent by sharing css
* fix: use shared css vars across all components
* fix: clean up buttons used with icons only
* fix: improve modal positioning and scrolling
* style: enforce eslint rules
* build: rollup config exported for building Strawberry in other Svelte projects

# 0.14.0
* chore(build): export minified dist files
* chore(build): add `pkg.svelte` to allow consuming original components
* feat: export `active` and `visible` props in `dropdown` component
* feat: add regular and autocomplete `select` components
* feat: support changing `icon` component color with javascript
* fix: add `fade` transition to `modal` and `tooltip`
* fix: add `slide` transitions to list items

# 0.13.2
* fix: import change module path

# 0.13.1
* fix: import change module path

# 0.13.0
* feat: separate dropdown and sidebar items.
* feat: ability to use sidebar & dropwdown without items prop
* feat: add onclick events to checkbox & radio label
* fix: clip dropwdown menu items for border-radius.
* feat: improve styling of linked menu-items
* build: compile components before exports

## 0.12.0
* feat: add fullwidth button
* feat: add label to textarea
* feat: add onclick event for items
* fix: add base text input
* refactor: move textarea component
* style: remove style transitions from inputs
* style: fix button icon misalignment

## 0.11.2
* style: better number input styling

## 0.11.1
* fix: clamp number input onchange, not reactively
* style: clean up input border styles

## 0.11.0
* feat: add mouseover + mouseout events to buttons
* fix: clamp number input onchange, not reactively

## 0.10.1
* fix: change incorrect icon path

## 0.10.0
* fix: align flex button text horizontally
* feat: break out input into seperate components

## 0.9.3
* fix: input number capping min and max values

## 0.9.2
* fix: eliminate circular dependency in import
* fix: clamp string values in number input

## 0.9.1
* fix: properly export input

## 0.9.0
* feat: add number input component
  
## 0.8.1
* fix: disable closability for modal overlay
  
## 0.8.0
* feat: ability to hide modal close button 

## 0.7.0
* feat: add ability to show modal via prop
  
## 0.6.0
* fix: standardize color pallete
* fix: improve textarea + input border ui
* feat: add input number component

## 0.5.0
* feat: add flip and spin to icon component

## 0.4.2
* fix: actually export dropdown component :sweat_smile:

## 0.4.1
* fix: export dropdown component
  
## 0.4.0
* feat: add dropdown component

## 0.3.0
* feat: make compilable to custom elements
  
## 0.2.1
* fix textarea component default props
* fix conflicting and remove unused button styles
* fix sidebar collapsing in flex parent
* fix button loading icon missing
* fix icon component svg view box size
* refactor sidebar

## 0.2.0
* Add textarea component
* Remove conflicting styles
* Delete modal manager owing to new modal component

## 0.1.6
* Rewrite modal component
* Upgrade Svelte dependency

## 0.1.5
* Minor button UI improvement
* Disable selection in sidebar text
* Fix modal close button
* Use @mdi/js as icon source

## 0.1.4
* Remove some unused styles
* Add installation instructions to README
* Add sidebar component

## 0.1.3
* Fix button loading icon not showing
* Fix icon component's SVG

## 0.1.2
* Fix button icon not showing

## 0.1.1
* Initial release