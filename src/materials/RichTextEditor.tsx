import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { RichTextEditor as MantineRichTextEditor } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import '@mantine/tiptap/styles.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Superscript,
            SubScript,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <MantineRichTextEditor editor={editor}>
            <MantineRichTextEditor.Toolbar sticky stickyOffset={60}>
                <MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.Bold />
                    <MantineRichTextEditor.Italic />
                    <MantineRichTextEditor.Underline />
                    <MantineRichTextEditor.Strikethrough />
                    <MantineRichTextEditor.ClearFormatting />
                    <MantineRichTextEditor.Highlight />
                    <MantineRichTextEditor.Code />
                </MantineRichTextEditor.ControlsGroup>

                <MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.H1 />
                    <MantineRichTextEditor.H2 />
                    <MantineRichTextEditor.H3 />
                    <MantineRichTextEditor.H4 />
                    <MantineRichTextEditor.H5 />
                    <MantineRichTextEditor.H6 />
                </MantineRichTextEditor.ControlsGroup>

                <MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.Blockquote />
                    <MantineRichTextEditor.BulletList />
                    <MantineRichTextEditor.OrderedList />
                    <MantineRichTextEditor.Subscript />
                    <MantineRichTextEditor.Superscript />
                </MantineRichTextEditor.ControlsGroup>

                <MantineRichTextEditor.ControlsGroup>
                    <MantineRichTextEditor.AlignLeft />
                    <MantineRichTextEditor.AlignCenter />
                    <MantineRichTextEditor.AlignRight />
                    <MantineRichTextEditor.AlignJustify />
                </MantineRichTextEditor.ControlsGroup>
            </MantineRichTextEditor.Toolbar>
            <EditorContent editor={editor} />
        </MantineRichTextEditor>
    );
};

export default RichTextEditor;