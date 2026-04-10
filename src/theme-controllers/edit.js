/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import { PanelBody, TextareaControl } from "@wordpress/components";
import "./editor.scss";
import Switcher from "./switcher";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "aitattman-blocks")}>
					<TextareaControl
						label={__("Light Icon", "aitattman-blocks")}
						value={attributes.iconLight ?? ""}
						onChange={(v) => setAttributes((p) => ({ ...p, iconLight: v }))}
					/>
					<TextareaControl
						label={__("Dark Icon", "aitattman-blocks")}
						value={attributes.iconDark ?? ""}
						onChange={(v) => setAttributes((p) => ({ ...p, iconDark: v }))}
					/>
					<TextareaControl
						label={__("System Icon", "aitattman-blocks")}
						value={attributes.iconSystem ?? ""}
						onChange={(v) => setAttributes((p) => ({ ...p, iconSystem: v }))}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()} data-element="ait_theme_controllers">
				{attributes.iconLight && (
					<Switcher
						id="ait-theme-light"
						value="light"
						icon={attributes.iconLight}
					/>
				)}
				{attributes.iconDark && (
					<Switcher
						id="ait-theme-dark"
						value="dark"
						icon={attributes.iconDark}
					/>
				)}
				{attributes.iconSystem && (
					<Switcher
						id="ait-theme-system"
						value="system"
						icon={attributes.iconSystem}
					/>
				)}
			</div>
		</>
	);
}
