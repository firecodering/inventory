import Api from '../services/Api'

export default {
  index (search) {
    return Api().get('Items', {
      params: {
        search: search
      }
    })
  },
  post (item) {
    return Api().post('Items', item)
  },

  shows (item) {
    return Api().get('Items', item)
  },
  put (item) {
    return Api().put(`items/${item.ItemID}`, item)
  }
}
