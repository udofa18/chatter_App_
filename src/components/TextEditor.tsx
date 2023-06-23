import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const RenderMd = ({ markdown }) => (
  <ReactMarkdown
    children={markdown}
    components={{
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, "")}
            style={atomDark}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
    }}
  />
);

const TextEditor = () => {
  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    // setContent(handleEditorChange) 
  };
//   setForm({ ...form, content });

  return (
    <div className="App">
      
      <MdEditor
        style={{ height: "500px" }}
        // value={content}
        renderHTML={(text) => <RenderMd markdown={text} />}
        onChange={handleEditorChange}
        
      />
      
    </div>
  );
};

export default TextEditor;
