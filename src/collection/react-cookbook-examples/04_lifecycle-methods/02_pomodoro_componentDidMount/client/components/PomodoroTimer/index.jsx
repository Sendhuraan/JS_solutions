import React, { Component } from 'react';

import './index.css';

class PomodoroTimer extends Component {
	constructor() {
		super();

		this.state = {
			time: 0
		};

		this.timeFor = {
			work: 1500,
			shortBreak: 300,
			longBreak: 900
		};

		this.setTimeForWork = this.setTimeForWork.bind(this);
		this.setTimeForShortBreak = this.setTimeForShortBreak.bind(this);
		this.setTimeForLongBreak = this.setTimeForLongBreak.bind(this);
	}

	componentDidMount() {
		this.setTimeForWork();
	}

	setTimeForWork() {
		this.setState({
			time: this.timeFor.work
		});

		this.startCountDown();
	}

	setTimeForShortBreak() {
		this.setState({
			time: this.timeFor.shortBreak
		});

		this.startCountDown();
	}

	setTimeForLongBreak() {
		this.setState({
			time: this.timeFor.longBreak
		});

		this.startCountDown();
	}

	formatTime(input) {
		const m = Math.floor(input % 3600 / 60);
		const s = Math.floor(input % 3600 % 60);

		return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
	}

	startCountDown() {
		clearInterval(this.interval);

		this.interval = setInterval(() => {
			this.setState(function(state) {
				let newState = Object.assign({}, state);
				newState.time = state.time - 1;

				return newState;
			});
		}, 1000);
	}

	render() {
		const { time } = this.state;

		return (
			<div className='Pomodoro'>

				<div className='timer'>
					{this.formatTime(time)}
				</div>

				<div className='types'>
					<button className='start' onClick={this.setTimeForWork}>Start Working</button>
					<button className='short' onClick={this.setTimeForShortBreak}>Short Break</button>
					<button className='long' onClick={this.setTimeForLongBreak}>Long Break</button>
				</div>
			</div>
		);
	}
}

export default PomodoroTimer;
