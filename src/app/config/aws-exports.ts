import Auth from "aws-amplify"
export const AmplifyConfig={
    Auth:{
        region:`${process.env.region}`,
        userPoolId: `${process.env.userpoolid}`,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: `${process.env.clientid}`,
    }
}