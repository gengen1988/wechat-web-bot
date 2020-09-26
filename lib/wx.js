// send
function sendTextMessage(text) {
  const $scope = angular.element('[ng-controller=chatSenderController]').scope()
  $scope.editAreaCtn = text
  $scope.sendTextMessage()
}

// receive
function onNewMessage(handler) {
  const $scope = angular.element('#chatArea').scope()
  $scope.$watchCollection('chatContent', function (newMsg, oldMsg) {
    const msg = newMsg[newMsg.length - 1]
    if (msg.ToUserName == $scope.currentUser) return
    const content = msg.Content
    handler(content)
  })
}

// proxy
function getChatReply(content) {
  return fetch(['http://127.0.0.1:1337/', content].join(''))
    .then(res => res.text())
}

onNewMessage(function (content) {
  getChatReply(content)
    .then(sendTextMessage)
})
