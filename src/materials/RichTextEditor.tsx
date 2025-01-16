import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Descendant, Element as SlateElement, Text as SlateText } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import Toolbar from './Toolbar';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean };

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorValue, setEditorValue] = useState<CustomElement[]>([
    {
      type: 'paragraph',
      children: [{ text: value }],
    },
  ]);

  const handleChange = (newValue: Descendant[]) => {
    setEditorValue(newValue as CustomElement[]);
    const textContent = newValue.map(n => {
      if (SlateText.isText(n)) {
        return n.text;
      } else if (SlateElement.isElement(n)) {
        return n.children.map(c => SlateText.isText(c) ? c.text : '').join('');
      }
      return '';
    }).join('\n');
    onChange(textContent);
  };

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={editorValue} onChange={handleChange}>
      <Toolbar />
      <Editable renderLeaf={renderLeaf} />
    </Slate>
  );
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default RichTextEditor;