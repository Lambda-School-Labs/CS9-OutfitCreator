import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

import { ROOT_URL } from '../../config.js';
import CR_Logo from '../../media/images/cr_logo.png';
import { Icons } from '../../media/icons/index.js';

class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPage: props.location.pathname.slice(1),
		};

		this.allPages = {
			upload: 'Add Item',
			closet: 'My Closet',
			create: 'New Outfit',
			archive: 'Outfit Archive'
    };

		this.setAuthToken();
	}

	setAuthToken = () => {
		const token = localStorage.getItem('authToken');
		if (token) axios.defaults.headers.common.Authorization = token;
		else delete axios.defaults.headers.common.Authorization;
	};

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);
	}

	updateDimensions = () => {
		if (window.innerWidth < 700) {
			this.setState({ fullSideNav: true });
		} else if (this.state.navCollapseActive) {
			this.setState({ fullSideNav: false });
		}
	};

	signOut() {
		localStorage.removeItem('authToken');
		window.location = `${ROOT_URL.WEB}/`;
	}

	render() {
		return (
			<div className="navigation-container">
				<img alt="closet roulette logo" className="navigation-logo" src={CR_Logo} />
				<div className={`navigation-pages`}>
					{this.state.navCollapseActive ? (
            <div className={`navigation-page page-${this.state.currentPage}`} onClick={this.toggleDrawer}>
              {this.allPages[this.state.currentPage]}
            </div>
					) : (
						Object.keys(this.allPages).map((page) => (
							<div className={`navigation-page page-${page}`} key={page}>
								{this.state.currentPage === page ? (
									<span className="navigation-page-indicator" />
								) : null}
								<span>
									<a href={`${ROOT_URL.WEB}/${page}`}>{this.allPages[page]}</a>
								</span>
							</div>
						))
					)}
				</div>
				<img alt="user options icon" className="navigation-user" onClick={this.toggleDrawer} src={Icons.userCircle} />
			</div>
		);
	}
}

export default withRouter(Navigation);
