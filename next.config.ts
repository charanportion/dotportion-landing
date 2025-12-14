// next.config.mjs
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // Optional: global remark/rehype plugins
  // options: { remarkPlugins: [], rehypePlugins: [] }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you want .mdx to be pages in app router:
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
