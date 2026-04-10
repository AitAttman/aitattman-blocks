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
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";
import { useEffect, useRef, useState } from "@wordpress/element";
import Slider from "./slider";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const [numPosts, setNumPosts] = useState(attributes.numPosts || 5);
	const blockProps = useBlockProps();
	const sliderRef = useRef(null);
	const SlidePlaceholder = () => {
		return (
			<div className="slide">
				<div
					style={{
						width: "100%",
						height: "300px",
						display: "flex",
						justifyContent: "center",
						background: "#ccc",
						alignItems: "center",
					}}
				>
					<p className="caption">
						{__("Thumbnail will appear Here", "aitattman-blocks")}
					</p>
				</div>
				{attributes.caption && (
					<p className="caption">
						{__("Caption will be shown here...", "aitattman-blocks")}
					</p>
				)}
			</div>
		);
	};
	useEffect(() => {
		if (!sliderRef.current) return;
		let sliderInstance = null;
		sliderInstance = Slider(sliderRef.current, {
			navButtons: attributes.navButtons,
			navDots: attributes.navDots,
			interval: attributes.interval,
			autoplay: attributes.autoplay,
		});
		return () => {
			sliderInstance?.destroy();
		};
	}, [
		attributes.navButtons,
		attributes.navDots,
		attributes.interval,
		attributes.autoplay,
		attributes.numPosts,
		attributes.caption,
	]);
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Posts Settings", "aitattman-blocks")}>
					<TextControl
						label={__("Post Type", "aitattman-blocks")}
						value={attributes.postType ?? ""}
						onChange={(value) =>
							setAttributes((p) => ({ ...p, postType: value }))
						}
						help={__("eg: post, page, product", "aitattman-blocks")}
					/>
					<TextControl
						label={__("Category SLug", "aitattman-blocks")}
						value={attributes.category ?? ""}
						onChange={(value) =>
							setAttributes((p) => ({
								...p,
								category: value.replace(/\s+/, ""),
							}))
						}
						help={__("Taxonomy term slug", "aitattman-blocks")}
					/>
					<TextControl
						label={__("Taxonomy", "aitattman-blocks")}
						value={attributes.taxonomy ?? ""}
						onChange={(value) =>
							setAttributes((p) => ({
								...p,
								taxonomy: value.replace(/\s+/, ""),
							}))
						}
						help={__(
							"eg: category, post_tag, product_cat, product_tag",
							"aitattman-blocks",
						)}
					/>
					<TextControl
						label={__("Thumbnail Size", "aitattman-blocks")}
						value={attributes.thumbnailSize ?? ""}
						onChange={(value) =>
							setAttributes((p) => ({ ...p, thumbnailSize: value }))
						}
						help="eg: thumbnail, medium, medium_large, large, full"
					/>
					<TextControl
						label={__("Number of posts", "aitattman-blocks")}
						value={attributes.numPosts ?? 5}
						type="number"
						onChange={(value) =>
							setAttributes((p) => {
								setNumPosts(value);
								return { ...p, numPosts: value };
							})
						}
					/>
					<ToggleControl
						label={__("Show Caption", "aitattman-blocks")}
						checked={attributes.caption ?? true}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								caption: !attributes.caption,
							}))
						}
					/>
				</PanelBody>
				<PanelBody title={__("Slider Settings", "Ait Attman")}>
					<ToggleControl
						label={__("Navigation Buttons", "aitattman-blocks")}
						checked={attributes.navButtons ?? true}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								navButtons: !attributes.navButtons,
							}))
						}
					/>
					<ToggleControl
						label={__("Navigation Dots", "aitattman-blocks")}
						checked={attributes.navDots ?? true}
						onChange={() =>
							setAttributes((p) => ({ ...p, navDots: !attributes.navDots }))
						}
					/>
					<ToggleControl
						label={__("Autoplay", "aitattman-blocks")}
						checked={attributes.autoplay ?? false}
						onChange={() =>
							setAttributes((p) => ({ ...p, autoplay: !attributes.autoplay }))
						}
					/>
					<TextControl
						label={__("Interval", "aitattman-blocks")}
						help={__("Only if autoplay is enabled", "aitattman-blocks")}
						value={attributes.interval ?? ""}
						type="number"
						onChange={(value) =>
							setAttributes((p) => ({ ...p, interval: value }))
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="slider" ref={sliderRef}>
					<div className="slides">
						{Array.from({ length: numPosts }).map((x) => (
							<SlidePlaceholder key={x} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
