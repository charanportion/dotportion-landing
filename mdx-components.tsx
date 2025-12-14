import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="scroll-m-20 pt-6 mb-4 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-zinc-50"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="scroll-m-20 mt-8 mb-3 text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="scroll-m-20 mt-6 mb-2 text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="scroll-m-20 mt-5 mb-2 text-lg font-semibold text-gray-900 dark:text-zinc-100"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="text-[15px] md:text-base text-gray-800 dark:text-zinc-300 leading-relaxed mt-3 mb-3"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-[15px] md:text-base text-gray-800 dark:text-zinc-300 list-decimal pl-6 space-y-2 mt-2 mb-3"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-[15px] md:text-base text-gray-800 dark:text-zinc-300 list-disc pl-6 space-y-2 mt-2 mb-3"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li className="pl-1 leading-relaxed" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong
      className="font-semibold text-gray-900 dark:text-zinc-100"
      {...props}
    />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "underline underline-offset-2 decoration-gray-300 dark:decoration-zinc-600 text-blue-600 hover:text-blue-700 dark:text-zinc-200 dark:hover:text-zinc-50 transition-colors";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return (
      <code
        className="rounded px-1.5 py-0.5 text-[13px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-4 mb-4 overflow-x-auto rounded-lg bg-zinc-950 text-zinc-50 text-sm p-4 border border-zinc-800"
      {...props}
    />
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="mt-4 mb-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-left text-sm text-gray-800 dark:text-zinc-200">
        <thead className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
          <tr>
            {data.headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wide text-gray-500 dark:text-zinc-400"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="mt-4 mb-4 border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 text-gray-700 dark:text-zinc-300 text-[15px] md:text-base italic"
      {...props}
    />
  ),
};

declare global {
  // eslint-disable-next-line no-var
  var __mdxTypes: typeof components;
}

export function useMDXComponents(): typeof components {
  return components;
}
