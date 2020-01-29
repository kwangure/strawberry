# :strawberry: Strawberry changelog

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