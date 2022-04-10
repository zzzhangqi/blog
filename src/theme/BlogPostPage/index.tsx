import React from 'react';
// import Seo from '@theme/Seo';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BackToTopButton from '@theme/BackToTopButton';
import { ThemeClassNames,PageMetadata,HtmlClassNameProvider} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TOC from '@theme/TOC';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import 'gitalk/dist/gitalk.css';
import GitalkComponent from 'gitalk/dist/gitalk-component';
import type {Props} from '@theme/BlogPostPage';
import clsx from 'clsx';
// import useViews from './useViews';

function BlogPostPageMetadata(props: Props): JSX.Element {
  const {content: BlogPostContents} = props;
  const {assets, metadata} = BlogPostContents;
  const {title, description, date, tags, authors, frontMatter} = metadata;
  const {keywords} = frontMatter;
  const image = assets.image ?? frontMatter.image;
  return (
    <PageMetadata
      title={title}
      description={description}
      keywords={keywords}
      image={image}>
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={date} />
      {/* TODO double check those article meta array syntaxes, see https://ogp.me/#array */}
      {authors.some((author) => author.url) && (
        <meta
          property="article:author"
          content={authors
            .map((author) => author.url)
            .filter(Boolean)
            .join(',')}
        />
      )}
      {tags.length > 0 && (
        <meta
          property="article:tag"
          content={tags.map((tag) => tag.label).join(',')}
        />
      )}
    </PageMetadata>
  );
}

function BlogPostPageContent(props) {
  const { content: BlogPostContents, sidebar } = props;
  const {
    // TODO this frontmatter is not validated/normalized, it's the raw user-provided one. We should expose normalized one too!
    frontMatter,
    assets,
    metadata,
  } = BlogPostContents;
  const { title, permalink, description, nextItem, prevItem, date, tags, authors } = metadata;
  const { hide_table_of_contents: hideTableOfContents, keywords, toc_min_heading_level: tocMinHeadingLevel, toc_max_heading_level: tocMaxHeadingLevel } = frontMatter;

  const {
    siteConfig: { url: siteUrl },
  } = useDocusaurusContext();

  // const views = useViews(props.content);

  const labels = tags.length > 0 ? tags.map((t) => t.label) : ['Gitalk', title];
  const options = {
    clientID: 'e0329a751b17e19974a9',
    clientSecret: '0dfdab9b44b6399daa3ca324ab4f067c1bf78b06',
    repo: 'blog',
    owner: 'zzzhangqi',
    admin: ['zzzhangqi'],
    id: title,
    title: title,
    labels: labels,
    body: siteUrl + permalink + '\n' + description,
    distractionFreeMode: false,
  };
  const image = assets.image ?? frontMatter.image;

  return (
    <BlogLayout
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
      sidebar={sidebar}
      toc={
        !hideTableOfContents && BlogPostContents.toc && BlogPostContents.toc.length > 0 ? (
          <TOC toc={BlogPostContents.toc} minHeadingLevel={tocMinHeadingLevel} maxHeadingLevel={tocMaxHeadingLevel} />
        ) : undefined
      }
      title={title} description={description}
    >
      <BackToTopButton />


      <BlogPostItem frontMatter={frontMatter} assets={assets} metadata={metadata} isBlogPostPage > {/* views={views}> */}
        <BlogPostContents />
      </BlogPostItem>
      {(nextItem || prevItem) && <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />}

      <BrowserOnly fallback={<div></div>}>{() => <GitalkComponent options={options} />}</BrowserOnly>
    </BlogLayout>
  );
}

export default function BlogPostPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogPostPage,
      )}>
      <BlogPostPageMetadata {...props} />
      <BlogPostPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
