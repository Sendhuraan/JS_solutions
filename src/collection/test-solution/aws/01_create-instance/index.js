(async function() {

	var AWS = require('aws-sdk');

	AWS.config.update({
		region: 'ap-south-1'
	});

	var instanceParams = 
	{
		ImageId: 'ami-0889b8a448de4fc44', 
		InstanceType: 't2.micro',
		KeyName: 'Sendhuraan-key-pair-ap-mumbai',
		MinCount: 1,
		MaxCount: 1,
		SecurityGroupIds: [
			'sg-0f441d0d4273d94d6'
		],
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
		]
	};

	var ec2_service = new AWS.EC2({
		apiVersion: '2016-11-15'
	});

	var ec2_instance = await ec2_service.runInstances(instanceParams).promise();

	console.log('Instance Created');
	ec2_instance.Instances.map(function(instance) {
		console.log(instance);
	})
	
})();




