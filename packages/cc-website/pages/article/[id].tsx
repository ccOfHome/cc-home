import { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, FloatButton, Watermark, Affix } from 'antd';
import * as tocbot from 'tocbot';

import articleStyles from './Article.module.css'
import { queryArticleById } from '../api/article';

import Header from '../components/header/header';
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';

import { formatDistance } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function Article() {

  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [publishTime, setPublishTime] = useState('2000-1-1 00:00');
  const [userId, setUserId] = useState(1);

  const queryArticle = async () => {
    if(id) {
      const result = await queryArticleById('/api/website/queryArticleById', id as string);
      if(result) {
        setTitle(result.title);
        setArticle(result.content);
        setPublishTime(formatDistance(new Date(result.publishTime), new Date(), { addSuffix: true, locale: zhCN }));
        setUserId(result.userId);
      }
    }
  }

  useEffect(() => {
    queryArticle();
    
    setTimeout(() => {
      tocbot.init({
        tocSelector: '#toc',
        contentSelector: '#tocContent',
        headingSelector: 'h1, h2, h3, h4, h5, h6',
        hasInnerContainers: true,
        // linkClass: 'toc-link',
        // isCollapsedClass: 'is-collapsed',
        scrollSmooth: true,
        scrollSmoothDuration: 420,
        headingsOffset: 40,
        collapseDepth: 0,
        includeHtml: true,
        includeTitleTags: true,
      });
    }, 100)

    return () => {
      tocbot.destroy();
    };
  }, [id])

  return (
    <>
      <main className={articleStyles.singleArticle}>
        <Row className={articleStyles.header}>
          <Header/>
        </Row>
        <Row className={articleStyles.articleDesc}>
          <Row className={articleStyles.articleTitle}>{ title }</Row>
          <Row className={articleStyles.description}>
            <Col className={articleStyles.creator}>
              <UserOutlined />
              <span className={articleStyles.articleData}>{ userId }</span>
            </Col>
            <Col className={articleStyles.updateTime}>
              <FieldTimeOutlined />
              <span className={articleStyles.articleData}>{ publishTime }</span>
            </Col>
          </Row>
        </Row>
        <Row className={articleStyles.articleContent}>
          <Watermark className={articleStyles.tocContainer} content="CC码码">
            <div id='tocContent' className={articleStyles.articleDetail} dangerouslySetInnerHTML={{ __html: article }}></div>
          </Watermark>
          <Affix offsetTop={300}>
            {/* <div>大纲</div> */}
            <div id='toc' className={articleStyles.toc}></div>
          </Affix>
        </Row>
        <FloatButton.BackTop visibilityHeight={500} />
      </main>
    </>
  )
}
