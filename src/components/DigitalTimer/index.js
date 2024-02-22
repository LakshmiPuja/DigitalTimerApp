import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    minutes: 25,
    seconds: 0,
  }

  timerId = null

  componentWillUnmount = () => {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState({isRunning: true})
      this.timerId = setInterval(this.tick, 1000)
    }
  }

  pauseTimer = () => {
    const {isRunning} = this.state
    if (isRunning) {
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    }
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({minutes: 25, seconds: 0, isRunning: false})
  }

  increaseTime = () => {
    const {isRunning, minutes} = this.state
    if (!isRunning) {
      this.setState({minutes: minutes + 1})
    }
  }

  decreaseTime = () => {
    const {isRunning, minutes} = this.state
    if (!isRunning && minutes > 0) {
      this.setState({minutes: minutes - 1})
    }
  }

  tick = () => {
    const {seconds, minutes} = this.state
    if (seconds === 0) {
      if (minutes === 0) {
        this.resetTimer()
        return
      }
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        seconds: 59,
      }))
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  render() {
    const {isRunning, minutes, seconds} = this.state
    const timerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`
    const timerStatus = isRunning ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <h1 className="title">Digital Timer</h1>
        <div className="inner-container">
          <div className="timer-container">
            <div className="time-card">
              <h1 className="time-text">{timerText}</h1>
              <p className="time-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-status-and-text-container">
            <div className="timer-text-container">
              <div className="timer-status-container">
                <button
                  type="button"
                  className="btn status"
                  onClick={isRunning ? this.pauseTimer : this.startTimer}
                >
                  <img
                    src={
                      isRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    className="image"
                    alt={isRunning ? 'pause icon' : 'play icon'}
                  />
                  {isRunning ? 'Pause' : 'Start'}
                </button>
              </div>

              <div className="timer-text-container">
                <button
                  type="button"
                  className="btn status"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="image"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <div className="timer-set-container">
              <p className="set-time">Set Timer limit</p>
              <div className="time-change-container">
                <button
                  type="button"
                  className="timer-btn"
                  onClick={this.decreaseTime}
                  disabled={isRunning || minutes === 0}
                >
                  -
                </button>
                <p className="timer-text">{minutes}</p>
                <button
                  type="button"
                  className="timer-btn"
                  onClick={this.increaseTime}
                  disabled={isRunning}
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
