import React from 'react';
import { Link } from 'react-router-dom';

import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
	return (
		<div>
			<SurveyList />
			<div className="info">
				<h4>Hey hey</h4>
				<h5>
					This is a simple SPA application that can create email surveys and send them via SendGrid
				</h5>
				<br />
				<h4>Used technologies:</h4>
				<h5>
					React, Redux, GoogleAuth, SendGrid, Stripe, Express, MongoDB, Telegram API, Socket.io
				</h5>
				<br />
				<h4>Info:</h4>
				<h5>
					While doing this project i wasn't focusing on the front-end but instead focused on the
					back-end.
				</h5>
				<h5>
					You can check out the code at:{' '}
					<a target="_blank" href="https://github.com/dumihuvud/easy-mail">
						github.com/dumihuvud/easy-mail
					</a>
				</h5>
			</div>
			<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large red">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
