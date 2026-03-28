# Ait Blocks: Wordpress Plugin for Custom Blocks
### Free wordpress plugin to enable some essential custom blocks on your website
Wordpess is powerful content management system, and the blocks concept made it easy to insert components in the text editor like paragraphs, headings, images, links...

However, wordpress itself does not provide some blocks you likely need for your website such as **Slider/Carousel** to display content in slides, **Side panels** on left, right, top and bottom position to display content like mobile navigation menu.
## Installation
1. Clone this repository or download it.
2. Put the following files in a folder named "**ait-blocks**":
	* **ait-blocks.php**
	* **build**
	* **languages**
2. Zip **ait-blocks** so the file becomes for example **plugin.zip**
4. Go your Wordpress dashboard > plugins > add plugin > upload plugin > choose file plugin.zip.

## Available Blocks
* Slider
* Query Posts
* Search Box
* Sidepanel
* Button
* Theme Controllers
## Screenshots
### 1. Slider
The Slider/Carousel displays posts with thumbnails based on post type, category, tag or custom taxonomy.
![Wordpress carousel block](docs/images/slider.webp)
### 2. Query Posts
Custom query to display recent posts
![wordpress custom query block](docs/images/query-posts.webp)
### 3. Search Box Block
Custom search box with search icon
![Wordpress search box block](docs/images/searchbox.webp)
### 4. Side-panel
Display hidden sidepanels in position like left, right, top, bottom. To show/hide panel just define **Triggers Class Name** and it that class to **buttons** and elements you want to control the sidepanel.

You can make the trigger to close hide the panel by adding class: **action-close**
![wordpress side panel block](docs/images/sidepanel.webp)
### 5. Button Block
Custom button block with/without svg icon. To convert the button to link element just choose "link" from **Tag Type** and enter the url.
![Wordpress custom button block with svg icon](docs/images/button.webp)
### 6. Theme Controllers
Custom dark/light mode icons based
![Wordpres theme controllers block](docs/images/theme-controllers.webp)
