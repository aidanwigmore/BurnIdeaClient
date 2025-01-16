import React from 'react';
import { Editor, Transforms, Text, Element } from 'slate';
import { useSlate } from 'slate-react';
import { Button } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

interface CustomText extends Text {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface CustomElement extends Element {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

const Toolbar: React.FC = () => {
  const editor = useSlate();

  const toggleFormat = (format: keyof CustomText) => {
    const isActive = isFormatActive(editor, format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  };

  const isFormatActive = (editor: Editor, format: keyof CustomText) => {
    const [match] = Editor.nodes(editor, {
      match: n => (n as CustomText)[format] === true,
      universal: true,
    });
    return !!match;
  };

  return (
    <div>
      <Button color="secondary" onMouseDown={event => { event.preventDefault(); toggleFormat('bold'); }}>
        <FormatBoldIcon />
      </Button>
      <Button color="secondary" onMouseDown={event => { event.preventDefault(); toggleFormat('italic'); }}>
        <FormatItalicIcon />
      </Button>
      <Button color="secondary" onMouseDown={event => { event.preventDefault(); toggleFormat('underline'); }}>
        <FormatUnderlinedIcon />
      </Button>
    </div>
  );
};

export default Toolbar;