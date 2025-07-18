import React from 'react';
import * as PRSS from 'prss';
import cx from 'classnames';
import Header from '../resources/components/Header';
import Footer from '../resources/components/Footer';
import Page from '../resources/components/Page';

const Home = data => {
  PRSS.init(data);
  (window as any).PRSS = PRSS;

  const { featuredImageUrl, featuredImageAlt, truncateTitleLength = 65 } = PRSS.getProp('vars') as IVars;

  const links = PRSS.getJsonProp('vars.links') as ILink[];

  const { content } = PRSS.getProp('item');
  const { title, url } = PRSS.getProp('site');
  const sidebarHtml = PRSS.getProp('sidebarHtml');

  const items = PRSS.getItems('post', true);

  return (
    <Page className="page-home">
      <Header />
      <main>
        <div className="container main-container">
          <div className="row">
            <div className="col">
              <div className="content">
                <section className="post-content">
                  <div
                    className="post-inner-content"
                    dangerouslySetInnerHTML={{
                      __html: content
                    }}
                  />
                </section>

                <section className="mb-3">
                  <h2 className="section-title">
                    <span>Latest Posts</span>
                    <a href={PRSS.getPathUrl('blog')}>more</a>
                  </h2>

                  <div className="row mt-4 mb-4 g-0">
                    {items.slice(0, 6).map(post => {
                      return (
                        <div className="col-12 col-sm-12 col-md-6 col-lg-4 card-wrapper mb-4">
                          <div className="card">
                            <a
                              href={post?.url}
                              className={cx('card-image', {
                                'card-has-img': !!post?.vars?.featuredImageUrl
                              })}
                            >
                              {post?.vars?.featuredImageUrl && (
                                <img
                                  className="card-img-top"
                                  src={post?.vars?.featuredImageUrl}
                                  alt={post?.vars?.featuredImageAlt}
                                  loading="lazy"
                                />
                              )}
                            </a>

                            <div className="card-body">
                              {post?.title && (
                                <a className="card-title" href={post?.url}>
                                  {PRSS.truncateStr(post?.title, parseInt(truncateTitleLength as any))}
                                </a>
                              )}

                              {post?.content && (
                                <p className="card-text mt-1">{post?.content}</p>
                              )}

                              {post?.createdAt && (
                                <p className="card-text">
                                  <small
                                    className="text-muted"
                                    title={PRSS.formattedDate(post?.createdAt)}
                                  >
                                    Posted {PRSS.formattedDate(post?.createdAt)}
                                  </small>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
            {sidebarHtml && (
              <div
                className="col-3"
                dangerouslySetInnerHTML={{
                  __html: sidebarHtml
                }}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </Page>
  );
};

export default Home;
