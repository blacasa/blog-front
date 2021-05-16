import ApiService from './sync.service.js'

export default (ctx, inject) => {
  ctx.apiService = new ApiService(ctx)
  inject('apiService', ctx.apiService)
}