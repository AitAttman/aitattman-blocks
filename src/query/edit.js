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
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import "./style.scss";
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
	const blockPropos = useBlockProps();
	const PostContent = () => {
		return (
			<div className="post-content">
				<div
					className="thumbnail"
					style={{
						backgroundColor: "#ccc",
					}}
				></div>
				<div className="post-info">
					<div className="post-title">
						<a href="#">Lorem ipsum dolor sit amet consectetur adipisicing</a>
					</div>
					{attributes.showAuthorName && (
						<div className="author">
							<span>Samuel Parker</span>
						</div>
					)}
					{attributes.showDate && (
						<div className="post-date">
							<span>Feb 11, 2026</span>
						</div>
					)}
					{attributes.showExcerpt && (
						<div className="post-snippet">
							<span>
								Accusantium blanditiis voluptatum dolore laborum consequuntur
								adipisci quia, odio dolor impedit nesciunt animi commodi
							</span>
						</div>
					)}
				</div>
			</div>
		);
	};
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Query", "aitattman-blocks")}>
					<ToggleControl
						label={__("Use default query", "aitattman-blocks")}
						checked={attributes.defaultQuery ?? true}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								defaultQuery: !attributes.defaultQuery,
							}))
						}
					/>
					<ToggleControl
						label={__("Show items found message", "aitattman-blocks")}
						checked={attributes.showItemsFoundMessage ?? true}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								showItemsFoundMessage: !attributes.showItemsFoundMessage,
							}))
						}
					/>
					{!attributes.defaultQuery && (
						<>
							<ToggleControl
								label={__("For related Posts", "aitattman-blocks")}
								checked={attributes.isRelatedPosts ?? false}
								onChange={() =>
									setAttributes((p) => ({
										...p,
										isRelatedPosts: !attributes.isRelatedPosts,
									}))
								}
								help={__("N.b. works in single posts", "aitattman-blocks")}
							/>
							{!attributes.isRelatedPosts && (
								<>
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
									/>
								</>
							)}
							<TextControl
								label={__("Taxonomy", "aitattman-blocks")}
								value={attributes.taxonomy ?? ""}
								onChange={(value) =>
									setAttributes((p) => ({
										...p,
										taxonomy: value.replace(/\s+/, "_"),
									}))
								}
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
						</>
					)}
					<TextControl
						label={__("Thumbnail Size", "aitattman-blocks")}
						value={attributes.thumbnailSize ?? ""}
						onChange={(value) =>
							setAttributes((p) => ({ ...p, thumbnailSize: value }))
						}
						help="eg: thumbnail, medium, medium_large, large, full"
					/>
				</PanelBody>
				<PanelBody title={__("Appearance", "Ait Attman")}>
					<ToggleControl
						label={__("Show Author Name", "aitattman-blocks")}
						checked={attributes.showAuthorName ?? true}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								showAuthorName: !attributes.showAuthorName,
							}))
						}
					/>
					<ToggleControl
						label={__("Show Date", "aitattman-blocks")}
						checked={attributes.showDate ?? true}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								showDate: !attributes.showDate,
							}))
						}
					/>
					<ToggleControl
						label={__("Show Excerpt", "aitattman-blocks")}
						checked={attributes.showExcerpt ?? false}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								showExcerpt: !attributes.showExcerpt,
							}))
						}
					/>
					{attributes.showExcerpt && (
						<RangeControl
							label={__("Excerpt length", "aitattman-blocks")}
							min={50}
							max={250}
							step={5}
							value={attributes.excerptLength ?? 100}
							onChange={(v) =>
								setAttributes((p) => ({ ...p, excerptLength: v }))
							}
							help={__("Number of characters for excerpt.", "aitattman-blocks")}
						/>
					)}
					<ToggleControl
						label={__("Use pagination", "aitattman-blocks")}
						checked={attributes.usePagination ?? true}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								usePagination: !attributes.usePagination,
							}))
						}
					/>
					<ToggleControl
						label={__("Use search", "aitattman-blocks")}
						checked={attributes.useSearch ?? true}
						onChange={() =>
							setAttributes((p) => ({
								...p,
								useSearch: !attributes.useSearch,
							}))
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockPropos}>
				<p>
					<i>
						{__(
							"N.B. this is just an example, not the actual preview",
							"aitattman-blocks",
						)}
					</i>
				</p>
				{attributes.showItemsFoundMessage && (
					<p className="rp-items-found-message">
						{__("Found 33 items", "aitattman-blocks")}
					</p>
				)}
				<div className="ait-query">
					{Array.from({ length: numPosts }).map((_, index) => {
						return <PostContent key={index} />;
					})}
				</div>
			</div>
		</>
	);
}
