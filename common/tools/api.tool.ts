import { createPostHeaders } from './request.tool'

const api = {
  generate: '/generate'
}

export default {
  generate: async (site: string, selector: string) => {
    var headers = createPostHeaders({ site: site, selector: selector })

    await fetch(api.generate, headers)
  }
}
