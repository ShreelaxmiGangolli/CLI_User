import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const lambdaFunction = new lambda.Function(this,"LambdaFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      code:lambda.Code.fromAsset("lambda"),
      handler:"main.handler",
    });

    const functionUrl = lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors:{
        allowedOrigins:["*"],
        allowedMethods:[lambda.HttpMethod.ALL],
        allowedHeaders:["*"],
      },
    }) ;

    new cdk.CfnOutput(this,"Url",{
      value: functionUrl.url,
    });

    // example resource
    // const queue = new sqs.Queue(this, 'DeployQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
