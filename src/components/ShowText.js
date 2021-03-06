import React from 'react';

import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';
import { Value } from 'slate';

export default class ShowText extends React.Component {
  
  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  }
  
  render() {
    
    const value = (this.props.value[0] === '{' ? Value.fromJSON(JSON.parse(this.props.value)): Plain.deserialize(this.props.value));
    
    const editor = <Editor value={value} 
      readOnly={true} 
      spellCheck={false}
      renderNode={this.renderNode}
      renderMark={this.renderMark}  />;
    
      return editor;
      
  }
}