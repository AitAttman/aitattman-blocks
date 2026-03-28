=== Ait Blocks ===
Contributors: aitattman
Tags: Block Editor, Side-panels, Buttons, Carousel
Requires at least: 6.4
Tested up to: 6.9
Requires PHP: 8.1
Stable tag: 1.1.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Enable Wordpress custom blocks like Side-panel, Search Box, Query Posts, Button, Slider and Theme Controllers.

== Description ==

Most websites have some common elements like *side-panels* that act as containers for other elements like mobile navigation menus, and *slider* to display content like images with captions, and *buttons* with text and svg icons... This plugin provides some of such elements as blocks for Gutenberg Editor in Wordpress.

== Screenshots ==

1. Search for "aitattman" and choose the right block.
2. Display recent posts thumbnails with titles in slider.
3. Add side-panels as containers on right, left, top or bottom position.
4. Display svg icons as buttons and add link to them.

== Installation ==

You can install this plugin in two different methods:

= Install from Wordpress plugins directory =

1. Log in to your WordPress dashboard.
2. Navigate to Plugins > Add New.
3. In the search field, type “Ait Blocks”, then click Search Plugins.
4. Click Install Now, then Activate.

= Install manually  =

1. Download the plugin **.zip** file from [https://wordpress.org/plugins/ait-blocks](https://wordpress.org/plugins/ait-blocks) or [https://github.com/AitAttman/ait-blocks](https://github.com/AitAttman/ait-blocks)
2. Upload it to your server under `/wp-content/plugins/`.
3. Activate it through the Plugins screen in WordPress.

== Frequently Asked Questions ==

= Does this plugin work with Full Site Editing? =
Yes. Ait Blocks plugin works perfectly with block themes and the Site Editor.

= Is this plugin really free? =
Yes, absolutely. This plugin is 100% free and open-source under the GPL license. There are no \"Pro\" versions, no hidden subscriptions, and no locked features. Everything you see is what you get.

= Can I add other blocks inside Sidepanel block? =
Yes. You can place other blocks iside **Sidepanel** blocks.

= How to open/close Sidepanel block? =
You can add **Triggers Class Name** in configuration sidebar of Sidepanel, and then add this css class name to triggers like buttons that will open the Sidepanel. To make the trigger to close the Sidepanel add extra css class named "action-close".

For instance, if the triggers class name is "sidemenu-trigger", and to close the Sidepanel by a buttons, just add to that button these two classes: **"sidemenu-trigger action-close"**

= Can I display svg icons using this plugin? =
Yes. With **Button** block, you can add an svg icon in the sidebar controls. You can as well add text side by side the icon and add link or make it simple element for display purposes.

You can copy svg icons from websites that offer free icons like [https://lucide.dev/icons](https://lucide.dev/icons).

= Can I display any photos in the Slider? =
No. The *Slider* in current version can only display posts featured thumbnails with posts titles as captions. The Slider is meant to display recent posts by category (and other creteria).

= Why Slider or Query Posts dtesto not display live preview in the editor? =
For performance reasons, you can only see example of these blocks; *Slider* and *Query Posts*, not live preview in the editor. However, you can see the resulted block anytime on your public site.

== Changelog ==

= 1.1.0 - March 2026 =
* Fixed some translation issues.
* Removed blocks-manifest.php file and used block.json files instead.

= 1.0.0 - February 2026 =
* Initial release of Ait Block for Gutenberg.
