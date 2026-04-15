# AitAttman Blocks: WordPress Plugin to add custom blocks to the Gutenberg Editor.

### Free WordPress plugin to enable some essential custom blocks on your website.

WordPress is powerful content management system, and the blocks concept made it easy to insert components in the text
editor like paragraphs, headings, images, links...

However, WordPress itself does not provide some blocks you likely need for your website such as **Slider/Carousel** to
display content in slides, **Side panels** on left, right, top and bottom position to display content like mobile
navigation menu.

## Installation

1. Clone this repository or download the zip file.
2. Put the following files/folders in a folder named "**aitattman-blocks**":
	- **aitattman-blocks.php**
	- **build**
	- **languages**
3. Zip **aitattman-blocks** so the file becomes for example **plugin.zip**
4. Go to your WordPress site dashboard > plugins > add plugin > upload plugin > choose file plugin.zip.

## Available Blocks

- Slider
- Query Posts
- Search Box
- Side Panel
- Button
- Theme Controllers

## Screenshots

### 1. Slider

The Slider/Carousel displays posts with thumbnails based on post type, category, tag or custom taxonomy.
![WordPress carousel block](docs/images/slider.webp)

### 2. Query Posts

Custom query to display recent posts
![WordPress custom query block](docs/images/query-posts.webp)

### 3. Search Box Block

Custom search box with search icon
![WordPress search box block](docs/images/searchbox.webp)

### 4. Side-panel

Display hidden sidepanels in position like left, right, top, bottom. To show/hide panel just define **Triggers Class
Name** and it that class to **buttons** and elements you want to control the sidepanel.

You can make the trigger to close hide the panel by adding class: **action-close**
![WordPress side panel block](docs/images/sidepanel.webp)

### 5. Button Block

Custom button block with/without svg icon. To convert the button to link element just choose "link" from **Tag Type**
and enter the url.
![WordPress custom button block with svg icon](docs/images/button.webp)

### 6. Theme Controllers

Custom dark/light mode icons based
![Wordpres theme controllers block](docs/images/theme-controllers.webp)
