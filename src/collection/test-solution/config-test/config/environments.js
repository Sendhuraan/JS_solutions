(function() {

	var environments = {
		workstation: {
			instance: {
				parameters: {
					server: {
						port: 3000
					},
					db: {
						protocol: 'mongodb://',
						username: 'local',
						password: 'pass',
						port: 27017
					}
				},
				config: {
					type: 'workstation'
				}
			}
		},
		cloud: {
			enabled: true,
			includeDependencies: false,
			metadata: {
				name: 'config-test'
			},
			mode: 'production',
			parameters: {
				server: {
					port: 'ssm:/Server/Stage/Port'
				},
				db: {
					protocol: 'mongodb://',
					username: 'ssm:/DB/Mongo/Stage/Username',
					password: 'ssm:/DB/Mongo/Stage/Password',
					port: 'ssm:/DB/Mongo/Stage/Port'
				}
			},
			instances: [
				{
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
	};

	var publicAPI = {
		environments
	};

	module.exports = publicAPI;
	
})();