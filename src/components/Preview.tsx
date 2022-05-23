import { FC, Fragment, useEffect, useState, createElement, } from "react";
import ReactMarkdown from "react-markdown";
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import '../style/preview.css';
import 'github-markdown-css/github-markdown.css'
import remarkGfm from "remark-gfm";

interface PreviewProps {
  text: string,
}

const Preview: FC<PreviewProps> = ({text}) => {
  return (
    <ReactMarkdown
      className="preview markdown-body"
      children={text}
      components={{
        code: ({node, inline, className, children, ...props}) =>  {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? 
            <ReactSyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={vs}
              language={match[1]}
              PreTag="div"
            />
           : 
            <code className={`preview__code`} {...props}>
              {children}
            </code>
        }
      }}
      remarkPlugins={[remarkGfm]}
      />
  )
}

export default Preview;
