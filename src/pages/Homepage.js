import React from 'react';
import { PageHeader, Button, Descriptions, Carousel } from 'antd';
import { Link } from 'react-router-dom';

function Homepage() {
	return (
		<div>
			<PageHeader
				ghost={false}
				title="NOTED"
				subTitle="Create Your Note Now"
				extra={[
					<Link to="/login">
						<Button key="2">Login</Button>
					</Link>,
					<Link to="/register">
						<Button key="1" type="primary">
							Register
						</Button>
					</Link>,
				]}
			>
				<Descriptions size="small" column={3}>
					<Descriptions.Item label="Created">Dito Cahya Pratama</Descriptions.Item>
					<Descriptions.Item label="Creation Time">1 Day</Descriptions.Item>
					<Descriptions.Item label="Remarks">Doyatama Code, Khayal</Descriptions.Item>
				</Descriptions>
			</PageHeader>
			<Carousel autoplay className="carousel">
				<div class="quotes">
					<h1>NOTED Your List Now</h1>
				</div>
				<div class="quotes">
					<h1>Everything is Easy with NOTED</h1>
				</div>
				<div class="quotes">
					<h1>DO THE BEST</h1>
				</div>
			</Carousel>
		</div>
	);
}

export default Homepage;
