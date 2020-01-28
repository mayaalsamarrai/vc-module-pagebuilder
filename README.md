# vc-module-pagebuilder

## Overview

The Pagebuilder allows creating static pages from blocks and editing them using a visual editor.

Each page consists of different blocks. The blocks view and settings depend on web page requirements.

The page is created in the builder as a list of blocks with specific settings applied to each block. All data are saved in a Json file format.

## Subsystem component description

The builder is consisted of two subsystems:

1. Script with Preview creation logics;
1. Script with Preview visualization logics.

The Builder runs on admin side so that it can receive data and save changes made during editing of pages and themes.

The Preview script runs on Storefront, as only Storefront knows which templates should be used to generate the html.

The scripts 'communicate' with each other via messages- [`window.postMessage()`]

(https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

![page builder image demo](https://github.com/VirtoCommerce/vc-module-pagebuilder/blob/dev/page-builder-demo.gif?raw=true)

![Diagram](docs/media/screen-page-builder-1.png)

## Pagebuilder Interface part

### Add New Page

1. Go to More > Content module > select a Store and click on Pages widget;
1. On 'Pages list' blade select 'Add' to add a new page;
1. Choose 'Design page' on the new blade;
![Design page](docs/media/screen-add-page.png)
1. Fill out the following fields to create a new page:

   1. Name- required field;
   1. Page layout name - select from drop down list (optional);
   1. Language - select from dropdown list (optional);
   1. Page header (optional);
   1. Permalink;
   1. Page metatitle (optional);
   1. Page meta description (optional)
1. Click 'Create' button
1. The new page will be created.

### Edit New Page

1. Select the new page from the list;
1. Click 'Open in Designer';
1. The system opens the Pagebuilder that consists of:

   1. Editor;
   1. Preview area.
1. The Editor has two sections:

   1. Blocks;
   1. Theme.
1. In 'Blocks' section click on 'Blocks' to view the list of available blocks;
![Edit page](docs/media/screen-preview-edit-page.png)
1. Clicking on the '+' icon of the selected block will result in adding the block to the file;
1. Clicking on the block in the 'Preview' area opens the block editor;
![Edit block](docs/media/screen-edit-block.png)
1. Once the blocs are edited, click the 'Save' button to save the changes made;
1. Click on the icons above the blocks in the 'Preview' area to view different screen resolutions;
![Screen Resolutions](docs/media/screen-resolutions.png)

### Page Preview

1. Open Content module > select Store > clicks on Pages widget > select the page and click on 'Preview page' icon
![Preview](docs/media/screen-preview-page.png)
1. The system will display the page in Preview format with no possibility to edit the page.
![Preview on storefront](docs/media/screen-preview-on-store.png)

## Installation

### Install Pagebuilder module

1. Automatically: More > Modules > Available, select the CMS Page Builder module and click Install.
1. Manually: download module ZIP package from https://github.com/VirtoCommerce/vc-module-pagebuilder/releases. In VC Manager go to More > Modules > Advanced, upload module package and click Install.
1. Once the Pagebuilder module is installed, it will appear under 'Installed' modules.
1. The installed Pagebuilder module has two dependencies:

   1. Content module;
   1. Core module.

![Pagebuilder installed](docs/media/screen-cms-pagebuilder.png)

## Configuration

### Assets relative path

Relative URL in store used to find the preview.

### AutoToken URL

Relative path to VC platform used to update the authorization toke.

## Builder

The builder consists of two applications: 

1. The first app is the Builder itself. The builder is located in ./cms-designer folder.
The builder is run as follows:

   1. For production:
     ```
     npm run serve
     ```
    1. For development:

     ``` 

     npm run serve

     ``` 
1. The second part of the app is a script that allows page preview and starts on Storefront side. This script is located in ./store folder.

``` 
npm run build:prod
```
For debugging (map file should be created)

``` 
npm run build
```

## Settings

## License