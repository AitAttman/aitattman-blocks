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
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<TextControl
						label={__("Triggers class name", "aitattman-blocks")}
						value={attributes.triggers ?? ""}
						onChange={(value) =>
							setAttributes((p) => ({ ...p, triggers: value }))
						}
						help={__(
							"Add 'action-close' class to trigger to close the panel",
							"aitattman-blocks",
						)}
					/>
				</PanelBody>
				<PanelBody title={__("Panel Position", "Ait Attman")}>
					<ToggleControl
						label={__("Start", "aitattman-blocks")}
						checked={attributes.position === "start"}
						onChange={() => setAttributes((p) => ({ ...p, position: "start" }))}
					/>
					<ToggleControl
						label={__("End", "aitattman-blocks")}
						checked={attributes.position === "end"}
						onChange={() => setAttributes((p) => ({ ...p, position: "end" }))}
					/>
					<ToggleControl
						label={__("Top", "aitattman-blocks")}
						checked={attributes.position === "top"}
						onChange={() => setAttributes((p) => ({ ...p, position: "top" }))}
					/>
					<ToggleControl
						label={__("Bottom", "aitattman-blocks")}
						checked={attributes.position === "bottom"}
						onChange={() =>
							setAttributes((p) => ({ ...p, position: "bottom" }))
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} data-visible="true">
				<InnerBlocks />
			</div>
		</>
	);
}
