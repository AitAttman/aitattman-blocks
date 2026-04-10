import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { inputName, placeholder, searchLabel, showIcon } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "aitattman-blocks")}>
					<ToggleControl
						label={__("Show icon", "aitattman-blocks")}
						checked={showIcon}
						onChange={() =>
							setAttributes((p) => ({ ...p, showIcon: !showIcon }))
						}
					/>
					<TextControl
						label={__("Search Label", "aitattman-blocks")}
						value={searchLabel ?? ""}
						onChange={(value) =>
							setAttributes((p) => ({ ...p, searchLabel: value }))
						}
					/>
					<TextControl
						label={__("Placeholder", "aitattman-blocks")}
						value={placeholder ?? ""}
						onChange={(value) =>
							setAttributes((p) => ({ ...p, placeholder: value }))
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps} data-element="ait_searchbox">
				<div className="container">
					<input
						name={inputName || "s"}
						placeholder={placeholder || __("search...", "aitattman-blocks")}
					/>
					<button>
						{showIcon && <SearchIcon />}
						{!showIcon && <>{searchLabel || __("Search", "aitattman-blocks")}</>}
					</button>
				</div>
			</div>
		</>
	);
}

function SearchIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-search-icon lucide-search"
		>
			<path d="m21 21-4.34-4.34" />
			<circle cx="11" cy="11" r="8" />
		</svg>
	);
}
