import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

@observer
class App extends React.Component {
  trigger(action) {
    this.props.store[action]()
  }

  render() {
    const { count } = this.props.store
    return (
      <div>
        <span style={{ padding: '10px' }}>{count}</span>
        <button style={{ margin: '2px' }} onClick={this.trigger.bind(this, 'decrease')}>Decrease</button>
        <button style={{ margin: '2px' }} onClick={this.trigger.bind(this, 'increase')}>Increase</button>
        <button style={{ margin: '2px' }} onClick={this.trigger.bind(this, 'asyncIncrease')}>asyncIncrease</button>
      </div>
    )
  }
}

class Store {
  @observable count = 0

  @action
  increase() {
    this.count += 1
  }

  @action
  decrease() {
    this.count -= 1
  }

  @action
  asyncIncrease() {
    setTimeout(() => {
      this.count += 1
    }, 1000)
  }
}
const store = new Store()

ReactDOM.render(
  <App store={store} />, 
  document.getElementById('root')
)
