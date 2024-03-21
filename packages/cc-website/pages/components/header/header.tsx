import styles from './Header.module.css'
import Image from 'next/image'
import { HomeOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { getInfo } from '../../api/info'
import Link from 'next/link'

export default function Header() {
  const ccmama = require('../../images/ccmama.jpg')
  const banner = require('../../images/background.jpg')
  const sea = require('../../images/sea.png')
  const rainbow = require('../../images/rainbow.png')
  const sandbeach = require('../../images/sandbeach.png')
  const volcano = require('../../images/volcano.png')

  const sections = [
    {
      title: '前端',
      icon: sea
    },
    {
      title: 'Node.js',
      icon: rainbow
    },
    {
      title: '人生',
      icon: sandbeach
    },
    {
      title: '杂文',
      icon: volcano
    }
  ]

  const [info, setInfo] = useState([])

  const getInfoData = async () => {
    const result = await getInfo('/api/website/getEnableInfo');
    setInfo(result);
  }

  useEffect(() => {
    getInfoData();
  }, [])

  const getAllSections = () => {
    return (
      <>
        {
          sections.map((item, index) => {
            return (
              <div className={styles.section} key={index}>
                <Image
                  width={80}
                  height={80}
                  src={item.icon}
                  alt={''}
                  priority
                ></Image>
                <span className={styles.sectionTitle}>{item.title}</span>
              </div>
            )
          })
        }
      </>
    )
  }

  return (
    <>
      <div className={styles.headerNav}>
        <Link href='/'>
          <HomeOutlined />
          <span className={styles.headerTitle}>首页</span>
        </Link>
        <div>
          <Image
            className={styles.avatar}
            src={ccmama}
            width={50}
            height={50}
            alt=''>
          </Image>
        </div>
      </div>
      <div className={styles.banner}>
        <Image
          className={styles.bannerImage}
          layout="fill"
          objectFit="fill"
          src={banner}
          alt={''}
          priority
        ></Image>
        <div className={styles.info}>
          <div className={styles.nickName}>{info[0]?.title ?? ''}</div>
          <div className={styles.description}>
            {info[0]?.description ?? ''}
          </div>
        </div>
      </div>
      {/* <div className={styles.sections}>
        {getAllSections()}
      </div> */}
    </>
  )
}
