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
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import {
	PanelBody,
	SelectControl,
	TextareaControl,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
import { createElement, useEffect, useRef, useState } from "react";
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const richTextRef = useRef();
	const [extraClasses, setExtraClasses] = useState([]);
	const tags = [
		{ value: "button", label: __("Button", "aitattman-blocks") },
		{ value: "a", label: __("Link", "aitattman-blocks") },
		{ value: "span", label: __("Span", "aitattman-blocks") },
		{ value: "div", label: __("Div", "aitattman-blocks") },
	];
	// Focus the RichText when the whole block becomes selected
	useEffect(() => {
		if (isSelected && richTextRef.current) {
			// Small delay helps in many cases (layout has time to settle)
			const timer = setTimeout(() => {
				richTextRef.current?.focus();
			}, 0);

			return () => clearTimeout(timer);
		}
	}, [isSelected]);
	useEffect(() => {
		const classes = [];
		if (attributes.isColumn) classes.push("is-col");
		if (attributes.isReverse)
			classes.push(attributes.isColumn ? "reverse-col" : "reverse-row");
		setExtraClasses(classes);
	}, [attributes.isColumn, attributes.isReverse]);
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "aitattman-blocks")}>
					<SelectControl
						label={__("Tag type", "aitattman-blocks")}
						value={attributes.tag ?? "button"}
						onChange={(v) => setAttributes((p) => ({ ...p, tag: v }))}
						options={tags}
					/>
					{attributes.tag === "a" && (
						<TextControl
							label={__("Url", "aitattman-blocks")}
							placeholder="url value"
							value={attributes.url ?? ""}
							onChange={(v) => setAttributes((p) => ({ ...p, url: v }))}
						/>
					)}
					<ToggleControl
						label={__("Column Layout", "aitattman-blocks")}
						checked={attributes.isColumn ?? false}
						onChange={() =>
							setAttributes((p) => ({ ...p, isColumn: !attributes.isColumn }))
						}
					/>
					<ToggleControl
						label={__("Reverse", "aitattman-blocks")}
						checked={attributes.isReverse ?? false}
						onChange={() =>
							setAttributes((p) => ({ ...p, isReverse: !attributes.isReverse }))
						}
					/>
					<ToggleControl
						label={__("Enable icon", "aitattman-blocks")}
						checked={attributes.hasIcon}
						onChange={() =>
							setAttributes((p) => ({ ...p, hasIcon: !attributes.hasIcon }))
						}
					/>
					{attributes.hasIcon && (
						<TextareaControl
							label={__("Icon", "aitattman-blocks")}
							value={attributes.icon ?? ""}
							onChange={(v) => setAttributes((p) => ({ ...p, icon: v }))}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			{createElement(
				"button",
				{
					...useBlockProps({
						className: extraClasses.join(" "),
					}),
					"data-ait-element": "button",
				},
				<>
					<RichText
						ref={richTextRef}
						value={attributes.text || ""}
						placeholder="text..."
						onChange={(v) => setAttributes((p) => ({ ...p, text: v }))}
					/>
					{attributes.hasIcon && attributes.icon && (
						<span dangerouslySetInnerHTML={{ __html: attributes.icon }} />
					)}
				</>,
			)}
		</>
	);
}
