import _ from 'lodash';
import HTMLParser from 'node-html-parser';

export const link = (url) => {
  new URL(url);
};

export const extractInformation = (domain, html) => {
  const root = HTMLParser.parse(html);

  const rawLinks = root
    .querySelectorAll('a')
    .map(node => node.attributes["href"]);

  const links = _.chain(rawLinks)
    .compact()
    .uniq()
    .map((link) => {
      let url;

      // noinspection HttpUrlsUsage
      if (link.startsWith("http://") || link.startsWith("https://")) {
        try {
          url = new URL(link);
        } catch (e) {
          url = null;
        }
      } else if (link.startsWith("/")) {
        url = new URL(`${domain}${link}`);
      }

      return url;
    })
    .compact()
    .value();

  return {
    title: root.querySelector('body h1').rawText,
    body: root.querySelector('body').rawText,
    links: links,
  }
};
