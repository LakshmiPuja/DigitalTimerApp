// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isClick: false,
    minutes: 25,
    seconds: 0,
  }

  componentDidMount() {
    const {isClick} = this.state
    let {seconds, minutes} = this.state

    if (isClick === true) {
      const timerId = setInterval(() => {
        if (seconds === 0) {
          seconds = 59
          minutes -= 1
        }
        if (seconds !== 0) {
          seconds -= 1
          if (seconds < 10) {
            seconds = `0 ${seconds}`
          }
        } else {
          minutes -= 1
          if (minutes < 10) {
            minutes = `0${minutes}`
          }
        }

        this.setState({
          minutes,
          seconds,
        })
      }, 1000)
    }
  }

  componentWillUnmount() {
    const {isClick} = this.state
    const {minutes, seconds} = this.state
    if (isClick === false) {
      clearInterval(this.componentDidMount.timerId)
    }
    if (seconds === 0 && minutes === 0) {
      clearInterval(this.startTimer.timerId)
      this.setState({minutes: '00', seconds: '00'})
    }
  }

  resetTimer = () => {
    clearInterval(this.componentDidMount.timerId)
    this.setState({minutes: 25, seconds: 0})
  }

  increaseTime = () => {
    const {minutes} = this.state
    this.setState({minutes: minutes + 1})
  }

  decreaseTime = () => {
    const {minutes} = this.state
    this.setState({minutes: minutes - 1})
  }

  toggleIsClick = () => {
    const {isClick} = this.state
    this.setState({isClick: !isClick})
    console.log(isClick)
    if (isClick) this.componentDidMount()
    else this.componentWillUnmount()
  }

  render() {
    const {isClick, minutes, seconds} = this.state
    const imgUrl = isClick
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    return (
      <div className="bg-container">
        <h1 className="title">Digital Timer</h1>
        <div className="inner-container">
          <div className="timer-container">
            <div className="time-card">
              <p className="time-text">
                {minutes}:{seconds === 0 ? '00' : seconds}
              </p>
              <p className="time-status">{isClick ? 'Paused' : 'Running'}</p>
            </div>
          </div>
          <div className="timer-status-and-text-container">
            <div className="timer-text-container">
              <div className="timer-status-container">
                <button
                  type="button"
                  className="btn"
                  onClick={this.toggleIsClick}
                >
                  <img
                    src={imgUrl}
                    className="image"
                    alt={isClick ? 'pause icon' : 'play icon'}
                  />
                </button>
                <p className="status">{isClick ? 'Paused' : 'Start'}</p>
              </div>

              <div className="timer-text-container">
                <button type="button" className="btn" onClick={this.resetTimer}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="image"
                    alt="reset icon"
                  />
                </button>
                <p className="status">Reset</p>
              </div>
            </div>
            <div className="timer-set-container">
              <p className="set-time">Set Timer limit</p>
              <div className="time-change-container">
                <button
                  type="button"
                  className="timer-btn"
                  onClick={this.decreaseTime}
                  disabled={seconds > 0}
                >
                  -
                </button>
                <p className="timer-text">{minutes}</p>
                <button
                  type="button"
                  className="timer-btn"
                  onClick={this.increaseTime}
                  disabled={seconds > 0}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
