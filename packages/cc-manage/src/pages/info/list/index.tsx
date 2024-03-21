import { Button, Form, Input, Select, DatePicker, Table, Space, Tag, Divider, Col, Row, message, Image, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Outlet, useNavigate } from 'umi';
import { useEffect, useState } from 'react';

import styles from './index.less';

import { getInfoList } from '@/services/info';
import { format } from 'date-fns';

const { RangePicker } = DatePicker;

export default function InfoList() {

  const [infos, setInfos] = useState([])
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const infoState = [
    {
      value: 1,
      label: '启用',
      color: 'green',
    },
    {
      value: 0,
      label: '禁用',
      color: 'orange',
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: '信息标题',
      dataIndex: 'title',
      key: 'title',
      width: 100,
    },
    {
      title: '信息描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (content) => {
        return (
          <>{ content }</>
        )
      }
    },
    {
      title: '信息状态',
      key: 'enable',
      dataIndex: 'enable',
      width: 100,
      render: (status: number) => {
        const item = infoState.filter((item: any) => item.value === status)[0];
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
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 245,
      render: (row: any) => (
        <Space size="middle">
          <Button type="text" onClick={() => editInfo(row)}>
            编辑
          </Button>
          <Button type="link" onClick={() => disabledInfo(row.id)}>
            禁用
          </Button>
          <Button type="text" danger onClick={() => delInfo(row.id)}>
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
    getInfos(form);
  }, [])

  const addInfo = () => {
    modal.info({
      title: '添加网站信息',
      content: '123',
      centered: true,
      onOk: () => {

      }
    });
  }

  const editInfo = (row: any) => {
    modal.info({
      title: '编辑网站信息',
      content: '123',
      centered: true,
      onOk: () => {

      }
    });
  }

  const delInfo = (id: string) => {

  }

  const disabledInfo = (id: string) => {
    
  }

  const getInfos = async (value: any) => {
    const createStartTime = (value.createTime && value.createTime.length > 0) ? format(value.createTime[0], 'yyyy-MM-dd HH:mm:ss') : null;
    const createEndTime = (value.createTime && value.createTime.length > 0) ? format(value.createTime[1], 'yyyy-MM-dd HH:mm:ss') : null;

    const data = Object.assign(form, {
      title: value.title ?? null,
      description: value.description ?? null,
      enable: value.enable?? null,
      createStartTime,
      createEndTime,
    });
    const result = await getInfoList(data)
    if(result.data && Array.isArray(result.data)) {
      setInfos(result.data);
    } else {
      message.error(result.msg)
    }
  }

  return (
    <>
      <Outlet/>
      <Row justify={'space-between'} align={'middle'}>
        <span>网站信息列表</span>
        <Button type="primary" onClick={addInfo}>添加信息</Button>
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
        onFinish={getInfos}
      >
        <Row justify={'start'} align={'middle'} gutter={[16, 24]}>
          <Col span={5} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="信息标题" name="title">
              <Input placeholder="请输入信息标题" />
            </Form.Item>
          </Col>
          <Col span={5} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="信息描述" name="title">
              <Input placeholder="请输入信息描述" />
            </Form.Item>
          </Col>
          <Col span={5} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="信息状态" name="status">
              <Select
                showSearch
                placeholder="请选择信息状态"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={infoState}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Form.Item label="创建时间" name="createTime">
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
        dataSource={infos} />
    </>
  );
}
