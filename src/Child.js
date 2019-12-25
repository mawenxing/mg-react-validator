// 引入
import React from 'react'
import './index.css'
// 引入高阶组件
import withValidator from 'mg-react-validator'

//2. 类组件
class Child extends React.Component {
  render() {
    console.log('props', this.props)

    const {
      mgValues: { username, password },
      mgHandleChange,
      mgHandleBlur,
      mgErrors,
      mgTouched,
      mgHandleSubmit
    } = this.props

    return (
      <div className="root">
        <div>
          <span className="title">用户名</span>
          <input
            type="text"
            name="username"
            value={username}
            onBlur={mgHandleBlur}
            onChange={mgHandleChange}
          />
          {mgErrors.username && mgTouched.username && (
            <span className="error">*{mgErrors.username}</span>
          )}
        </div>
        <div>
          <span className="title">密码</span>
          <input
            type="text"
            name="password"
            value={password}
            onChange={mgHandleChange}
            onBlur={mgHandleBlur}
          />
          {mgErrors.password && mgTouched.password && (
            <span className="error">*{mgErrors.password}</span>
          )}
        </div>
        <button onClick={mgHandleSubmit}>按钮</button>
      </div>
    )
  }
}

Child = withValidator({
  mgMapStateToValues: { username: '1', password: '2' },
  mgHandleSubmit: (values, ownProps) => {
    console.log('点击了 handleSubmit')
  },
  mgValidate: values => {
    const errors = {}

    if (!values.username) {
      errors.username = 'Required'
    } else if (!/^[A-Z0-9]{3,6}$/i.test(values.username)) {
      errors.username = '用户名 格式错误'
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if (!/^[A-Z0-9]{3,6}$/i.test(values.password)) {
      errors.password = '密码 格式错误'
    }

    return errors
  }
})(Child)
// Child = withValidator({
//   mgMapStateToValues: { username: '1', password: '2' }
// })(Child)

// Child = withValidator({
//   mgMapStateToValues: { username: '', password: '' },
// mgHandleSubmit: (values, ownProps) => {
//   console.log('点击了 handleSubmit')
// },
// mgValidate: values => {
//   const errors = {}

//   if (!values.username) {
//     errors.username = 'Required'
//   } else if (!/^[A-Z0-9]{3,6}$/i.test(values.username)) {
//     errors.username = '用户名 格式错误'
//   }
//   if (!values.password) {
//     errors.password = 'Required'
//   } else if (!/^[A-Z0-9]{3,6}$/i.test(values.password)) {
//     errors.password = '密码 格式错误'
//   }

//   return errors
// }
// })(Child)

export default Child
