import { Button, Col, Input, message, Modal, Row, Space } from 'antd';
import BraftEditor, { EditorState, ExtendControlType } from 'braft-editor';
import { ContentUtils } from 'braft-utils'
import { SetStateAction, useRef, useState } from 'react';
import { InboxOutlined, RollbackOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'umi';
import Dragger from 'antd/es/upload/Dragger';
import { UploadProps } from 'antd/lib/upload/interface';

import styles from './index.less';
import 'braft-editor/dist/index.css';
import { addArticle } from '@/services/article';
import HeaderId from 'braft-extensions/dist/header-id'

BraftEditor.use(HeaderId({
  includeEditors: ['braft-editor'],
}));

export default function ArticleForm() {

  const extendControls: ExtendControlType[] = [
    // {
    //   key: 'custom-button',
    //   type: 'button',
    //   text: '预览',
    //   onClick: () => {
    //     preview()
    //   }
    // }
  ]

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [articleContent, setArticleContent] = useState(BraftEditor.createEditorState(null, { editorId: 'braft-editor'}));
  
  const [title, setTitle] = useState('');
  const [articleId, setArticleId] = useState('');

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const changeArticle = (editorState: EditorState) => {
    setArticleContent(editorState)
  }

  const backLast = () => {
    navigate('/manage/blog/article/list', {
      replace: true,
    });
  }

  const setBanner = () => {

  }

  const saveArticle = () => {
    if(title === '' || articleContent.isEmpty()) {
      message.warning('请填写完成文章标题和内容');
    }
    if(articleId !== '') {
      publishArticle('save')
      return;
    }
    const content = articleContent.toHTML();
    addArticle({
      title,
      content,
      status: 1,
    }).then((res) => {
      
      console.log('213', res);
      
      setArticleId(res.data.id);
      navigate('/manage/blog/article/list', { replace: true });
      message.success('保存成功');
    })
  }

  const publishArticle = (action: 'save' | 'publish') => {
    if(title === '' || articleContent.isEmpty()) {
      message.warning('请填写完成文章标题和内容');
    }
    const content = articleContent.toHTML();
    addArticle({
      id: articleId,
      title,
      content,
      status: action === 'save' ? 1 : 2,
    }).then(() => {
      if (action === 'save') {
        message.success('保存成功');
      } else {
        message.success('发布成功');
        navigate('/manage/blog/article/list', { replace: true });
      }
    })
  }

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(buildPreviewHtml());
    window.previewWindow.document.close();
  }

  const buildPreviewHtml = () => {
    const articleHtml = articleContent.toHTML();
    return `
      <!Doctype html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${articleHtml}</div>
        </body>
      </html>
    `
  }

  return (
    <>
      <Row className={styles.title_operator}>
        <Input className={styles.title_input} size={'middle'} maxLength={30} onChange={(e) => setTitle(e.target.value)} placeholder="请输入标题" bordered={false} />
        <Space wrap>
          <Button type="default" shape="circle" icon={<RollbackOutlined />} onClick={backLast}/>
          <Button type="primary" shape="circle" icon={<SettingOutlined />} onClick={showModal}/>
          <Button onClick={preview}>预览</Button>
          <Button type="primary" onClick={saveArticle}>保存</Button>
          <Button type="primary" onClick={() => publishArticle('publish')}>发布</Button>
        </Space>
      </Row>
      <Row className={styles.editor}>
        <Col span="24" className={styles.editeor_container}>
          <BraftEditor
            id='braft-editor'
            value={articleContent}
            onChange={changeArticle}
            media={{
              accepts: {
                  image: 'image/jpeg,image/png',
                  video: 'video/mp4',
                  audio: 'audio/mpeg,audio/mp3',
              },
              uploadFn: (upload) => {},
              // onChange(...rest) {
              //     console.log('onChange---rest', rest)
              // }
            }}
            style={{ border: '1px solid #d1d1d1', borderRadius: 3, background: '#fff' }}
            placeholder="开始你的写作吧"
            extendControls={extendControls}
          />
        </Col>
      </Row>
      <Modal
        title="Banner 图片上传"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="保存"
        cancelText="取消"
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
          <p className="ant-upload-hint">
            支持单个或批量上传。严禁上传无关文件等或被禁止的文件。
          </p>
        </Dragger>
      </Modal>
    </>
  )
}
