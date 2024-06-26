import { message, notification } from 'antd'
import { RequestConfig, useNavigate } from 'umi'

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number
  data: any
  msg: string
  errorCode?: number
  errorMessage?: string
  showType?: ErrorShowType
}

// 运行时配置
export const request: RequestConfig = {
  // 统一的请求设定
  timeout: 1000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },

  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { code, data, errorCode, errorMessage, showType } = res
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      if (!code) {
        const error: any = new Error(errorMessage)
        error.name = 'BizError'
        error.info = { errorCode, errorMessage, showType, data }
        throw error // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage)
              break
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage)
              break
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              })
              break
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break
            default:
              message.error(errorMessage)
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`)
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.')
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.')
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: { url: string | any[], headers: any }) => {
      // 拦截请求配置，进行个性化处理
      if(config.url === '/api/user/login') return config;
      const token = localStorage.getItem('token');
      if(!token) return config;
      const headers = Object.assign({}, config.headers, { Authorization: `Bearer ${token}` });
      return { ...config, headers };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response;
      if (data.code !== 0) {
        message.error(data.msg);
      }
      if (data?.type === 'token') {
        localStorage.clear();
      }
      return response;
    },
  ],
}
