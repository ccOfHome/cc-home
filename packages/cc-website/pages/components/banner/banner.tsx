import styles from './Banner.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getInfo } from '../../api/info'

export default function Banner() {
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
