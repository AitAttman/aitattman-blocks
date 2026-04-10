=== AitAttman Blocks for Gutenberg Editor ===
Contributors: aitattman
Tags: Block Editor, Side-panels, Buttons, Carousel
Requires at least: 6.4
Tested up to: 6.9
Requires PHP: 8.1
Stable tag: 1.2.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Enable WordPress custom blocks like Side-panel, Search Box, Query Posts, Button, Slider and Theme Controllers.

== Description ==

Most websites have some common elements like *side-panels* that act as containers for other elements like mobile navigation menus, and *slider* to display content like images with captions, and *buttons* with text and svg icons... This plugin provides some of such elements as blocks for Gutenberg Editor in WordPress.

== Screenshots ==

1. Search for "aitattman-blocks" and choose the right block.
2. Display recent posts thumbnails with titles in slider.
3. Add side-panels as containers on right, left, top or bottom position.
4. Display svg icons as buttons and add link to them.

== Installation ==

You can install this plugin in two different methods:

= Install from WordPress plugins directory =

1. Log in to your WordPress dashboard.
2. Navigate to Plugins > Add New.
3. In the search field, type “AitAttman Blocks”, then click Search Plugins.
4. Click Install Now, then Activate.

= Install manually  =

1. Download the plugin **.zip** file from [https://WordPress.org/plugins/aitattman-blocks](https://WordPress.org/plugins/aitattman-blocks) or [https://github.com/AitAttman/aitattman-blocks](https://github.com/AitAttman/aitattman-blocks)
2. Upload it to your server under `/wp-content/plugins/`.
3. Activate it through the Plugins screen in WordPress.

== Frequently Asked Questions ==

= Does this plugin work with Full Site Editing? =
Yes. AitAttman Blocks plugin works perfectly with block themes and the Site Editor.

= Is this plugin really free? =
Yes, absolutely. This plugin is 100% free and open-source under the GPL license. There are no \"Pro\" versions, no hidden subscriptions, and no locked features. Everything you see is what you get.

= Can I add other blocks inside Side-panel block? =
Yes. You can place other blocks inside **Side-panel** blocks.

= How to open/close Side-panel block? =
You can add **Triggers Class Name** in configuration sidebar of Side-panel, and then add this CSS class name to triggers like buttons that will open the Side-panel. To make the trigger to close the Side-panel add extra CSS class named "action-close".

For instance, if the triggers class name is "sidemenu-trigger", and to close the Side-panel by a button, just add to that button these two classes: **"sidemenu-trigger action-close"**

= Can I display svg icons using this plugin? =
Yes. With **Button** block, you can add an svg icon in the sidebar controls. You can as well add text side by side with the icon and add link or make it simple element for display purposes.

You can copy svg icons from websites that offer free icons like [https://lucide.dev/icons](https://lucide.dev/icons).

= Can I display any photos in the Slider? =
No. The *Slider* in current version can only display posts featured thumbnails with posts titles as captions. The Slider is meant to display recent posts by category (and other criteria).

= Why Slider or Query Posts does not display live preview in the editor? =
For performance reasons, you can only see an example of these blocks; *Slider* and *Query Posts*, not live preview in the editor. However, you can see the resulting block anytime on your public site.

= How does Theme Controllers block change site theme ? =
This block updates the data-theme="{theme}" attribute (where {theme} value can be: light, dark, or system) whenever the user clicks on the theme icon on the public site. Keep in mind that this block does not register the theme value in database; instead, it uses browser's *localStorage* to persist the user's preference.

== Changelog ==

= 1.2.0 - April 2026 =
* Changed plugin name and slug.
* updated readme.txt and LICENSE.

= 1.1.0 - March 2026 =
* Fixed some translation issues.
* Removed blocks-manifest.php file and used block.json files instead.

= 1.0.0 - February 2026 =
* Initial release of *AitAttman Blocks for Gutenberg plugin*.