import styles from './Header.module.css'
import Image from 'next/image'
import { HomeOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function Header() {
  const ccmama = require('../../images/ccmama.jpg')

  return (
    <>
      <div className={styles.headerNav}>
        <Link href='/'>
          <HomeOutlined rev={undefined} />
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
    </>
  )
}
