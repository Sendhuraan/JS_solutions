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
					setup: {
						securityGroup: {
							metadata: {
								Description: 'Security Group for JS_solutions Server',
								GroupName: 'JS_solutions_server_securityGroup',
							},
							parameters: {
								IpPermissions:[
									{
										IpProtocol: 'tcp',
										FromPort: 3000,
										ToPort: 3000,
										IpRanges: [
											{
												'CidrIp':'0.0.0.0/0'
											}
										]
									},
									{
										IpProtocol: 'tcp',
										FromPort: 22,
										ToPort: 22,
										IpRanges: [
											{
												'CidrIp':'0.0.0.0/0'
											}
										]
									}
								]
							}
						},
						compute: {
							parameters: {
								ImageId: 'ami-0889b8a448de4fc44', 
								InstanceType: 't2.micro',
								KeyName: 'Sendhuraan-key-pair-ap-mumbai',
								MinCount: 1,
								MaxCount: 1,
								SecurityGroupIds: [],
								TagSpecifications: [
									{
										ResourceType: 'instance',
										Tags: []
									}
								]	
							}
						}

					},
					config: {
						type: 'server',
						service: 'aws',
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
					setup: {
						securityGroup: {
							metadata: {
								Description: 'Security Group for JS_solutions DB',
								GroupName: 'JS_solutions_DB_securityGroup',
							},
							parameters: {
								IpPermissions:[
									{
										IpProtocol: 'tcp',
										FromPort: 8089,
										ToPort: 8089,
										IpRanges: [
											{
												'CidrIp':'0.0.0.0/0'
											}
										]
									},
									{
										IpProtocol: 'tcp',
										FromPort: 22,
										ToPort: 22,
										IpRanges: [
											{
												'CidrIp':'0.0.0.0/0'
											}
										]
									}
								]
							}
						},
						compute: {
							parameters: {
								ImageId: 'ami-0889b8a448de4fc44', 
								InstanceType: 't2.micro',
								KeyName: 'Sendhuraan-key-pair-ap-mumbai',
								MinCount: 1,
								MaxCount: 1,
								SecurityGroupIds: [],
								TagSpecifications: [
									{
										ResourceType: 'instance',
										Tags: []
									}
								]	
							}
						}

					},
					config: {
						type: 'db',
						service: 'aws',
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
