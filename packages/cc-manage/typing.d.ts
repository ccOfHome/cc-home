declare module 'braft-utils'
declare module 'braft-extensions/dist/table'
declare module 'braft-extensions/dist/header-id'


interface Window {      // window对象属性
  previewWindow: any;   // 加入对象
}

interface DataType {
  id: string
  title: string
  backgroundUrl: string
  content: string
  status: number
  createTime: string
  publishTime: string
}
