# Welcome to 3SIGNs Drupal 8 base theme: vva_custom

## Setup
1. Download the theme 
2. Put in themes > custom > theme_name
3. Replace every 'vva_custom' occurence with 'theme_name'
4. Run ` npm install ` in theme root
5. Run ` bower install ` in theme root

**GULP**: Use `gulp watch` to start theming. This wil compile the scss files. 
Change settings in .sass-lint.yml if you use other coding standards.

## Theming standards
### Base folder
Here we use _base.scss and _typography.scss.

### Component folder
This folder contains **blocks**, **forms**, **menus**, **misc**, **nodes** and **views**
subfolders.

### Layout folder
This contains the styling for various regions.

### Lib folder
This contains all of the often used extends, mixins and variables. 

## Bower
Use bower to install new vendor libraries. Run `bower install nameofthelibrary`.
This will download the lib to the bower_components folder. Don't forget to include these in 
.libraries.yml and .info.yml files.