import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        // Style headings
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-gray-100 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-200 mb-3 mt-6" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-gray-200 mb-2 mt-4" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-base font-semibold text-gray-300 mb-2 mt-3" {...props} />,
        
        // Style paragraphs
        p: ({ node, ...props }) => <p className="text-gray-200 leading-relaxed mb-4" {...props} />,
        
        // Style lists
        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-200" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-200" {...props} />,
        li: ({ node, ...props }) => <li className="text-gray-200 ml-4" {...props} />,
        
        // Style emphasis
        strong: ({ node, ...props }) => <strong className="font-bold text-gray-100" {...props} />,
        em: ({ node, ...props }) => <em className="italic text-gray-200" {...props} />,
        
        // Style code
        code: ({ node, inline, ...props }: any) => 
          inline ? (
            <code className="bg-slate-700 text-cyan-400 px-1.5 py-0.5 rounded text-sm" {...props} />
          ) : (
            <code className="block bg-slate-800 text-gray-200 p-4 rounded-lg overflow-x-auto text-sm" {...props} />
          ),
        
        // Style links
        a: ({ node, ...props }) => (
          <a 
            className="text-blue-400 hover:text-blue-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
            {...props} 
          />
        ),
        
        // Style blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 my-4" {...props} />
        ),
        
        // Style horizontal rules
        hr: ({ node, ...props }) => <hr className="border-slate-700 my-6" {...props} />,
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
