interface Window {
  __MP_Editor_JSAPI__: {
    invoke: (params: {
      apiName: string
      apiParam: any
      sucCb: (res: any) => void
      errCb: (err: any) => void
    }) => void
  }
}

interface Window {
  utools?: {
    shellOpenExternal: (url: string) => void
    ai: (options: {
      model?: string
      messages: Array<{
        role: `system` | `user` | `assistant`
        content?: string
        reasoning_content?: string
      }>
      tools?: Array<{
        type: `function`
        function?: {
          name: string
          description: string
          parameters: {
            type: `object`
            properties: Record<string, any>
          }
          required?: string[]
        }
      }>
    }, streamCallback?: (chunk: {
        role: `system` | `user` | `assistant`
        content?: string
        reasoning_content?: string
      }) => void) => Promise<{ content: string }>
    allAiModels: () => Promise<Array<{
      id: string
      label: string
      description: string
      icon: string
      cost: number
    }>>

    // 添加用户相关API
    getUser: () => {
      avatar: string
      nickname: string
      type: `member` | `user`
    } | null
    fetchUserServerTemporaryToken: () => Promise<{
      token: string
      expired_at: number
    }>
  }
  safeStorage: {
    getItem: (key: string) => any
    setItem: (key: string, value: any) => boolean
  }
}

declare const utools: {
  dbStorage: {
    setItem: (key: string, value: any) => void
    getItem: (key: string) => any
    removeItem: (key: string) => void
  }
}
