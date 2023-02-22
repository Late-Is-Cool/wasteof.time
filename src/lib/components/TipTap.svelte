<script lang="ts" context="module">
	export let editorObj: JSONContent;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import Underline from '@tiptap/extension-underline';
	import Highlight from '@tiptap/extension-highlight';
	import CharCount from '@tiptap/extension-character-count';
	import type { JSONContent } from '@tiptap/core';

	let editor: Readable<Editor>;

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit.configure({
					blockquote: {
						HTMLAttributes: {
							class: 'pl-4 border-l-4 border-secondary-200'
						}
					},
					bulletList: {
						HTMLAttributes: {
							class: 'list-disc pl-4'
						}
					},
					orderedList: {
						HTMLAttributes: {
							class: 'list-decimal pl-4'
						}
					},
					codeBlock: {
						HTMLAttributes: {
							class: 'bg-secondary-800 text-white rounded-md p-2'
						}
					},
					code: {
						HTMLAttributes: {
							class: 'bg-secondary-100 rounded-md p-1'
						}
					}
				}),
				Placeholder,
				Underline,
				Highlight.configure({
					HTMLAttributes: {
						class: 'text-white bg-primary-400'
					}
				}),
				CharCount.configure({
					limit: 1250
				})
			],
			editorProps: {
				attributes: {
					class:
						'p-2 border-secondary-200 border-2 border-t-0 rounded-b-md h-40 overflow-y-auto [&>p]:my-3'
				}
			},
			onUpdate: ({ editor }) => {
				editorObj = editor.getJSON();
			}
		});
	});
	const toggleBold = () => {
		$editor.chain().focus().toggleBold().run();
	};
	const toggleItalic = () => {
		$editor.chain().focus().toggleItalic().run();
	};
	const toggleStrike = () => {
		$editor.chain().focus().toggleStrike().run();
	};
	const toggleUnderline = () => {
		$editor.chain().focus().toggleUnderline().run();
	};
	const toggleHighlight = () => {
		$editor.chain().focus().toggleHighlight().run();
	};
	const toggleBlockQuote = () => {
		$editor.chain().focus().toggleBlockquote().run();
	};
	const toggleBulletList = () => {
		$editor.chain().focus().toggleBulletList().run();
	};
	const toggleOrderedList = () => {
		$editor.chain().focus().toggleOrderedList().run();
	};
	const toggleCodeBlock = () => {
		$editor.chain().focus().toggleCodeBlock().run();
	};
	const toggleCode = () => {
		$editor.chain().focus().toggleCode().run();
	};
	$: isActive = (name: string) => $editor.isActive(name);
</script>

{#if editor}
	<div
		class="border-secondary-200 bg-secondary-100 border-2 border-b-0 rounded-t-md p-2 flex gap-1"
	>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('bold')}
			on:click={toggleBold}
		>
			<iconify-icon icon="mdi:format-bold" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('italic')}
			on:click={toggleItalic}
		>
			<iconify-icon icon="mdi:format-italic" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('underline')}
			on:click={toggleUnderline}
		>
			<iconify-icon icon="mdi:format-underline" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('strike')}
			on:click={toggleStrike}
		>
			<iconify-icon icon="mdi:format-strikethrough-variant" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('highlight')}
			on:click={toggleHighlight}
		>
			<iconify-icon icon="mdi:format-color-highlight" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('blockquote')}
			on:click={toggleBlockQuote}
		>
			<iconify-icon icon="mdi:format-quote-open" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('bulletList')}
			on:click={toggleBulletList}
		>
			<iconify-icon icon="mdi:format-list-bulleted" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('orderedList')}
			on:click={toggleOrderedList}
		>
			<iconify-icon icon="mdi:format-list-numbered" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('codeBlock')}
			on:click={toggleCodeBlock}
		>
			<iconify-icon icon="mdi:code-braces" />
		</button>
		<button
			class="bg-secondary-400 text-white w-7 h-7 rounded text-xl flex items-center justify-center"
			class:!bg-primary-400={isActive('code')}
			on:click={toggleCode}
		>
			<iconify-icon icon="mdi:code-tags" />
		</button>
		<span class="float-right">{$editor.storage.characterCount.characters()}/1250</span>
	</div>
{/if}

<!-- <div class="prose-sm"> -->
<EditorContent editor={$editor} />
<!-- </div> -->
