/**
 * Page Metadata Configuration
 * 
 * Centralized SEO metadata for all static pages. Single source of truth
 * for titles and descriptions to ensure consistency across the site.
 * 
 * Usage:
 * ```astro
 * ---
 * import BaseLayout from '../layouts/BaseLayout.astro';
 * import SEO from '../components/SEO.astro';
 * import { pagesConfig } from '../pages.config';
 * ---
 * 
 * <BaseLayout>
 *   <SEO 
 *     slot="head"
 *     title={pagesConfig.projects.title}
 *     description={pagesConfig.projects.description}
 *   />
 *   <!-- Page content -->
 * </BaseLayout>
 * ```
 * 
 * @module pages.config
 */

/**
 * Page metadata interface
 */
interface PageMeta {
  /** Page title (used in browser tab and SEO) */
  title: string;
  
  /** Page description (used in meta tags and SEO) */
  description: string;
  
  /** Page heading (displayed as h1, optional - defaults to title) */
  heading?: string;
  
  /** Page intro text (displayed below heading, optional) */
  intro?: string;
}

/**
 * Pages configuration object
 * 
 * Contains metadata for all static pages. Dynamic pages (like individual
 * project or article pages) generate their own metadata from content.
 */
export const pagesConfig = {
  home: {
    title: 'Home',
    description: '풀스택 개발자 · 개발 리더. 시스템 아키텍처와 기술 의사결정, 비즈니스 임팩트를 만드는 포트폴리오.',
  },
  projects: {
    title: 'Projects',
    description: '문제 해결, 기술 결정, 측정 가능한 성과를 담은 프로젝트 케이스 스터디.',
    heading: 'Projects',
    intro: '',
  },
  decisions: {
    title: 'Decisions',
    description: '아키텍처와 구현 과정에서 내린 주요 기술 의사결정 기록.',
    heading: 'Decisions',
    intro: '',
  },
  journey: {
    title: 'Journey',
    description: '경력 성장과 학습 타임라인. 마일스톤, 전환점, 성장 스토리.',
    heading: 'Journey',
    intro: '',
  },
  blog: {
    title: 'Blog',
    description: '기술 글, 인사이트, 개발 경험을 정리한 블로그.',
    heading: 'Blog',
    intro: '',
  },
  about: {
    title: 'About',
    description: '소개 및 연락처. 경력, 역량, 학력 요약.',
    heading: 'About',
    intro: '서비스 전 주기를 경험한 개발자로, 백엔드 아키텍처와 안정적인 시스템 구현에 관심이 있습니다.',
  },
} as const;

/**
 * Type export for the pages configuration
 */
export type PagesConfig = typeof pagesConfig;

/**
 * Type export for a single page metadata
 */
export type PageConfig = PageMeta;
