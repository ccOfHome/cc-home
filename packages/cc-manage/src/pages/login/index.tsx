import { login } from '@/services/login';
import { Avatar, Button, Checkbox, Form, Input, message, Space } from 'antd';
import { useNavigate } from 'umi';
import styles from './index.less';
const ccmama = require('../../assets/ccmama.jpg');
// 引入加密包
const jwt = require('jsonwebtoken');
// 引入文件读取包
const fs = require('fs');

export default function Login() {

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    const { username, password } = values;
    login({
      nickName: username,
      password,
    }).then(res => {
      if(!res.data) {
        message.warning(res.msg);
      } else {
        localStorage.setItem('token', res.data.token)
        navigate('/manage/blog/article/list');
      }
    })
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    messageApi.open({
        type: 'warning',
        content: '请按照要求填写',
        duration: 2.5,
    })
    // .then(() => message.success('Loading finished', 2.5))
    // .then(() => message.info('Loading finished', 2.5));
  };

  return (
    <div className={styles.login}>
      {contextHolder}
      <Form
        className={styles.login_form}
        name="ccmama"
        layout={'horizontal'}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Avatar
          className={styles.avatar}
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          src={<img src={ccmama} alt="CC码码" />}
          alt="CC码码"
          draggable={false}
        />
        <Form.Item
          className={styles.form_item}
          label="账号"
          name="username"
          labelAlign="left"
          rules={[{ required: true, message: '请输入你的账户名称' }]}
        >
          <Input bordered={true} className={styles.control}/>
        </Form.Item>
        <Form.Item
          className={styles.form_item}
          label="密码"
          name="password"
          labelAlign="left"
          rules={[{ required: true, message: '请输入你的账户密码' }]}
        >
          <Input.Password bordered={true} className={styles.control}/>
        </Form.Item>
        <Form.Item className={styles.remember} name="remember" valuePropName="checked">
          <Checkbox>记住登录</Checkbox>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button type="default" htmlType="reset">
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
