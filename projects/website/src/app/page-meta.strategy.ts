import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { findComponent } from './routes/components/components.data';

/** The site's address, as search engines should list it. */
export const SITE_URL = 'https://www.ngx-govuk.org';

const SITE_NAME = 'ngx-govuk';
const HOME_TITLE = 'ngx-govuk: Angular components for the GOV.UK Design System';
const DEFAULT_DESCRIPTION =
  "Angular components and directives for the GOV.UK Design System, using GOV.UK Frontend's markup and styles. Built for Angular 22 and GOV.UK Frontend 6.";

interface PageMeta {
  title: string;
  description: string;
  /** Keeps the page out of search results, such as a placeholder page. */
  noindex?: boolean;
}

/**
 * Sets each page's title, description, canonical link and Open Graph tags
 * from its route, so search results and link previews describe the page
 * rather than the whole site.
 *
 * A route sets its `title` and `data.description`. Component pages take
 * both from `components.data.ts`.
 */
@Injectable({ providedIn: 'root' })
export class PageMetaStrategy extends TitleStrategy {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const page = this.pageMeta(snapshot);
    const title =
      page.title === HOME_TITLE ? HOME_TITLE : `${page.title} – ${SITE_NAME}`;
    const path = snapshot.url.split(/[?#]/)[0].replace(/\/$/, '');
    const url = SITE_URL + (path || '/');

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({
      property: 'og:description',
      content: page.description,
    });
    this.meta.updateTag({ property: 'og:url', content: url });
    if (page.noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
    } else {
      this.meta.removeTag('name="robots"');
    }
    this.setCanonical(url);
  }

  private pageMeta(snapshot: RouterStateSnapshot): PageMeta {
    let route: ActivatedRouteSnapshot = snapshot.root;
    while (route.firstChild) route = route.firstChild;

    const componentId = route.paramMap.get('componentId');
    if (componentId) {
      const component = findComponent(componentId);
      if (!component) {
        return {
          title: 'Component not found',
          description: DEFAULT_DESCRIPTION,
          noindex: true,
        };
      }
      const api = route.data['tab'] === 'api';
      return {
        title: `${component.name}${api ? ' API' : ''} – Components`,
        description: api
          ? `API reference for the ${component.name} component in ngx-govuk. ${component.description}`
          : component.description,
        noindex: component.status !== 'documented',
      };
    }

    return {
      title: this.buildTitle(snapshot) ?? HOME_TITLE,
      description: route.data['description'] ?? DEFAULT_DESCRIPTION,
    };
  }

  private setCanonical(url: string) {
    let link = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}
