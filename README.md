# mg-react-validator
- 一块应用在 React 上的轻量级表单验证器(高阶组件)

# Demo & github 地址
- https://github.com/mawenxing/mg-react-validator

# Install
```js
yarn add mg-react-validator
```

# Usage
- 第一步 : 引入高阶组件
```js
import  withValidator  from 'mg-react-validator'
```
- 第二步 : 高阶组件包装
```js
Child1 = withValidator({
  // 把当前的数据映射到 props 里面的 values 供表单使用
  mgMapStateToValues: { username: '', password: '' },
  // 点击提交表单
  mgHandleSubmit: (values, ownProps) => {
    console.log('点击了 handleSubmit')
  },
  // 校验规则
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
})(Child1)
```

- 第三步 : 从 props 引入一些数据
```js
    const {
      // 获取数据
      mgValues: { username, password },
      // 处理表单
      mgHandleChange,
      // 提交表单
      mgHandleSubmit,
      // 错误信息
      mgErrors,
      // 判断是否有效
      mgIsValid,
      // 失去焦点
      mgHandleBlur,
      // 点击过的表单元素
      mgTouched
    } = this.props
```

- 第四步 : 与表单绑定起来
```js
// 注意 : name 必须要有 
       <div>
          用户名 :
          <input
            type="text"
            name="username"
            onChange={mgHandleChange}
            value={username}
            onBlur={mgHandleBlur}
          />
          // 错误提示
          {mgTouched.username && mgErrors.username && (
            <span>{mgErrors.username}</span>
          )}
        </div>
        <div>
          密码 :
          <input
            type="text"
            name="password"
            onChange={mgHandleChange}
            value={password}
            onBlur={mgHandleBlur}
          />
          // 错误提示
          {mgTouched.password && mgErrors.password && (
            <span>{mgErrors.password}</span>
          )}
        </div>
        // 点击提交
        <button onClick={mgHandleSubmit}>按钮</button>
```

# Note
- 本高阶组件是一个轻量级的
- 由于时间仓促, 可能会有bug
- 欢迎提出指正修改意见,感谢!!