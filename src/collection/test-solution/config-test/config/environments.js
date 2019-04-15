(function() {

	var environments = {
		workstation: {
			env: {
				development: {
					enabled: true,
					instances: [
						{
							parameters: {
								server: {
									port: 3000
								},
								db: {
									username: 'local',
									password: 'pass',
									port: 27017,
									dbName: 'mongodb-cookbook-examples_01_inserting-records_users'

								}
							},
							config: {
								type: 'workstation'
							}
						}
					]
				}
			}
		},
		cloud: {
			config: {
				includeDependencies: true
			},
			env: {
				stage: {
					enabled: false,
					instances: [
						{
							parameters: {
								server: {
									port: 'ssm:/Server/Stage/Port'
								}
							},
							config: {
								type: 'aws',
								tags: [
									{
										Key: 'Name',
										Value: 'Node JS App Server'
									},
									{
										Key: 'Environment',
										Value: 'Stage'
									}
								]
							}
						},
						{
							parameters: {
								db: {
									username: 'ssm:/DB/Mongo/Stage/Username',
									password: 'ssm:/DB/Mongo/Stage/Password',
									port: 'ssm:/DB/Mongo/Stage/Port',
									dbName: 'mongodb-cookbook-examples_01_inserting-records_users'
								}
							},
							config: {
								type: 'aws',
								tags: [
									{
										Key: 'Name',
										Value: 'DB Server'
									},
									{
										Key: 'Environment',
										Value: 'Stage'
									}
								]
							}
						}
					]
				}
			}
		}
	}

	var publicAPI = {
		environments
	};

	module.exports = publicAPI;
	
})();
