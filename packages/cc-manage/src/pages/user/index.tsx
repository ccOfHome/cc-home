import styles from './index.less';
import loginAuth from '@/hocs/auth';

export default loginAuth(function User() {
  return (
    <div>
      <h1 className={styles.title}>Page post</h1>
    </div>
  );
})
