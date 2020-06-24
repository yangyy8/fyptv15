import { Message } from 'element-ui'

const showMessage = Symbol('showMessage')
class DonMessage {
  success (options, single = true) {
    var obj={}
    obj.message=options
    obj.offset=400
    obj.showClose=true
    obj.duration=2000
    this[showMessage]('success', obj, single)
  }
  warning (options, single = true) {
    var obj={}
    obj.message=options
    obj.offset=400
    obj.showClose=true
    obj.duration=3000
    this[showMessage]('warning', obj, single)
  }
  info (options, single = true) {
    var obj={}
    obj.message=options
    obj.offset=400
    obj.showClose=true
    obj.duration=3000
    this[showMessage]('info', obj, single)
  }
  error (options, single = true) {
    var obj={}
    obj.message=options
    obj.offset=400
    obj.showClose=true
    obj.duration=3000
    this[showMessage]('error', obj, single)
  }
  [showMessage] (type, options, single) {
    
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
       Message[type](options)
    }
  }
}
export default new DonMessage()