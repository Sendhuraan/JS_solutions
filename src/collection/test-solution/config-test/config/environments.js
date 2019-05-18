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
								GroupName: 'JS_solutions_server_security-group',
							},
							parameters: {
								IpPermissions:[
									{
										IpProtocol: 'tcp',
										FromPort: 3000,
										ToPort: 3000,
										IpRanges: [
											{
												'CidrIp': '0.0.0.0/0'
											}
										]
									},
									{
										IpProtocol: 'tcp',
										FromPort: 22,
										ToPort: 22,
										IpRanges: [
											{
												'CidrIp': '0.0.0.0/0'
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
								IamInstanceProfile: {
									Name: 'JS_solutions_admin'
								},
								TagSpecifications: [
									{
										ResourceType: 'instance',
										Tags: [
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
								],
								UserData: [
									'#!/usr/bin/env bash',
									'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash',
									'export NVM_DIR="$HOME/.nvm"',
									'[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"',
									'nvm install 8.11.3',
									'nvm use 8.11.3',
									'cat <<EOF >> /home/ec2-user/.bashrc',
									'export NVM_DIR="/.nvm"',
									'[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"',
									'EOF',
									'yum install git',
									'npm install pm2 -g'
								]
							}
						}
					},
					commands: {
						createAppFolder: {
							documentType: 'AWS-RunShellScript',
							commands: [
								'cd /var',
								'mkdir www',
								'cd www',
								'mkdir JS_app',
								'cd JS_app',
								'touch file.txt'
							]
						},
						pushToInstance: {
							documentType: 'AWS-RunShellScript',
							commands: [
								'cd /var',
								'mkdir www',
								'cd www',
								'mkdir JS_app',
								'git clone git@github.com:Sendhuraan/JS_deploy.git'
							]
						},
						createAppEnvironment: {
							inject: true,
							documentType: 'AWS-RunShellScript',
							commands: [
								'cd /var/www/JS_app',
								'touch env.json',
								'APP_PARAMS=calc:{env}',
								'echo $APP_PARAMS > env.json'
							]
						},
						startAppServer: {
							documentType: 'AWS-RunShellScript',
							commands: [
								'cd /var/www/JS_app',
								'npm start'
							],
						}
					},
					config: {
						type: 'server',
						service: 'aws',
						filters: [
							{
								Name: 'tag:Name',
								Values: [
									'Node JS App Server'
								]
							},
							{
								Name: 'tag:Environment',
								Values: [
									'Stage'
								]
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
