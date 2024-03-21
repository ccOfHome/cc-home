import { Button, Form, Input, Select, DatePicker, Table, Space, Tag, Divider, Col, Row, message, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Outlet, useNavigate } from 'umi';
import { useEffect, useState } from 'react';

import styles from './index.less';

import { deleteArticle, getArticleList, updateStatus } from '@/services/article';
import { format } from 'date-fns';

const { RangePicker } = DatePicker;

export default function ArticleList() {

  const [articles, setArticles] = useState([])
  const navigate = useNavigate();

  const articleState = [
    {
      value: 1,
      label: '待发布',
      color: 'geekblue',
    },
    {
      value: 2,
      label: '已发布',
      color: 'green',
    },
    {
      value: 3,
      label: '已删除',
      color: 'volcano',
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 100,
    },
    {
      title: '缩略图',
      dataIndex: 'backgroundUrl',
      key: 'backgroundUrl',
      width: 120,
      render: (backgroundUrl) => {
        return (
          <Image
            width={100}
            src={`${backgroundUrl}?${Date.now()}`}
            placeholder={
              <Image
                preview={false}
                src={`${backgroundUrl}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                width={100}
              />
            }
          />
        )
      },
    },
    {
      title: '文章概述',
      dataIndex: 'content',
      key: 'content',
      width: 300,
      render: (content) => {
        return (
          <>{ content.replace(/<.*?>/g, '').slice(0, 100) }</>
        )
      }
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 60,
      render: (status: number) => {
        const item = articleState.filter((item: any) => item.value === status)[0];
        return (
          <Tag color={item.color} key={item.value}>
            {item.label}
          </Tag>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      width: 120,
      render: (publishTime: string) => {
        const time = !!publishTime ? publishTime: '-';
        return (
          <>
            {time}
          </>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 245,
      render: (row: any) => (
        <Space size="middle">
          <Button type="text" onClick={() => editArticle(row)}>
            编辑
          </Button>
          <Button type="link" disabled={row.status === 2} onClick={() => publishArticle(row.id)}>
            发布
          </Button>
          <Button type="text" danger onClick={() => delArticle(row.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const form = {
    title: null,
    status: null,
    createStartTime: null,
    createEndTime: null,
    publishStartTime: null,
    publishEndTime: null,
  }
  
  useEffect(() => {
    getArticles(form);
  }, [])

  const addArticle = () => {
    navigate('/manage/blog/article/add', {
      replace: false,
    });
  }

  const editArticle = (row: any) => {
    navigate('/manage/blog/article/edit', {
      replace: false,
    });
  }

  const publishArticle = async (id: string) => {
    await updateStatus({
      id,
      status: 2,
    });
    await getArticles(form);
    message.success('发布成功');
  }

  const delArticle = async  (id: string) => {
    await deleteArticle({ id });
    await getArticles(form);
    message.success('删除成功');
  }

  const getArticles = async (value: any) => {
    const createStartTime = (value.createTime && value.createTime.length > 0) ? format(value.createTime[0], 'yyyy-MM-dd HH:mm:ss') : null;
    const createEndTime = (value.createTime && value.createTime.length > 0) ? format(value.createTime[1], 'yyyy-MM-dd HH:mm:ss') : null;
    const publishStartTime = (value.publishTime && value.publishTime.length > 0) ? format(value.publishTime[0], 'yyyy-MM-dd HH:mm:ss') : null;
    const publishEndTime = (value.publishTime && value.publishTime.length > 0) ? format(value.publishTime[0], 'yyyy-MM-dd HH:mm:ss') : null;
    
    const data = Object.assign(form, {
      title: value.title ?? null,
      status: value.status?? null,
      createStartTime,
      createEndTime,
      publishStartTime,
      publishEndTime,
    });
    const result = await getArticleList(data)
    if(result.data && Array.isArray(result.data)) {
      setArticles(result.data);
    } else {
      message.error(result.msg)
    }
  }

  return (
    <>
      <Outlet/>
      <Row justify={'space-between'} align={'middle'}>
        <span>文章列表</span>
        <Button type="primary" onClick={addArticle}>添加文章</Button>
      </Row>
      <Divider />
      <Form
        className={styles.form}
        layout={'inline'}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        colon={true}
        labelWrap={false}
        labelAlign="left"
        onFinish={getArticles}
      >
        <Row justify={'start'} align={'middle'} gutter={[16, 24]}>
          <Col span={5} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="文章标题" name="title">
              <Input placeholder="请输入文章标题" />
            </Form.Item>
          </Col>
          {/* <Col span={5} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="文章类型" name="articleType">
              <Select
                showSearch
                placeholder="请选择文章类型"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={articleType}
              />
            </Form.Item>
          </Col> */}
          <Col span={5} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="文章状态" name="status">
              <Select
                showSearch
                placeholder="请选择文章状态"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={articleState}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Form.Item label="创建时间" name="createTime">
              <RangePicker showTime />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Form.Item label="发布时间" name="publishTime">
              <RangePicker showTime />
            </Form.Item>
          </Col>
          <Col span={5} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button htmlType="reset">重置</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <Table 
        columns={columns}
        rowKey={
          (row) => {
            return row.id;
          }
        }
        scroll={{
          x: '100%'
        }}
        pagination={ { position: ['bottomRight'] } }
        dataSource={articles} />
    </>
  );
}
