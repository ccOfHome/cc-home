import { Col, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getArticleList } from '../../api/article'
import styles from './ArticleList.module.css'

export default function ArticleList() {
  const src =
    'https://typora-imgae-cloud.oss-cn-beijing.aliyuncs.com/ccmama/header-background.jpg'

  const [articles, setArticles] = useState([])

  const getArticleData = async () => {
    const result = await getArticleList('/api/website/getArticleList')
    setArticles(result)
  }

  useEffect(() => {
    getArticleData()
  }, [])

  return (
    <Row className={styles.articles}>
      {articles.map((item) => {
        return (
          <Col className={styles.article} key={item.id} xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
            <div className={styles.articleContainer}>
              <Link
                href={{
                  pathname: '/article/[id]',
                  query: { id: item.id },
                }}
              >
                <Image
                  className={styles.backImage}
                  layout="fill"
                  objectFit="fill"
                  src={src}
                  alt={''}
                  priority
                ></Image>
                <div className={styles.title}>{item.title}</div>
              </Link>
            </div>
          </Col>
        )
      })}
    </Row>
  )
}
