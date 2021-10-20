import Auth from "aws-amplify"
console.log(process.env.NG_APP_REGION);
export const AmplifyConfig={
    Auth:{
         region:process.env.NG_APP_REGION,
        userPoolId:process.env.NG_APP_USERPOOLID,
        userPoolWebClientId: process.env.NG_APP_USERPOOLWEBCLIENT
  
    }
}