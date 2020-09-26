const axios = require('axios');

module.exports = chat

function chat(apiKey, userId) {
  const api = tuling(apiKey)
  return function (text) {
    return api(0, { inputText: { text } }, { userId })
      .then(res => res.results
        .map(result => result.values.text)
        .join('\n')
      )
  }
}

function tuling(apiKey) {
  return function (reqType, perception, otherUserInfo) {
    const userInfo = { ...otherUserInfo, apiKey }
    return axios({
      method: 'post',
      url: 'https://openapi.tuling123.com/openapi/api/v2',
      data: { reqType, perception, userInfo }
    })
    .then(res => res.data)
  }
}
