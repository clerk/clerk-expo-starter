# Clerk Expo Starter

This starter project shows how to use [Clerk](https://www.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter) with [Expo](https://expo.dev/) to authenticate users in your [React Native](https://reactnative.dev/) application. When users sign up or sign in, Clerk handles the state of the authentication and renders public or [protected routes](https://reactnavigation.org/docs/auth-flow).

## Demo

### Sign up using One-time passcode (OTP)

<img src="./docs/sign-up-otp-demo.gif" width="300">

---

### Sign in using OAuth

<img src="./docs/sign-in-oauth-demo.gif" width="300">

## How to use

To run the example locally you need to:

1. Sign up at [Clerk.dev](https://www.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter).
2. Go to your [Clerk dashboard](https://dashboard.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter) and create an application.
3. Set your Frontend API key in `App.tsx`.
4. `yarn` to install the required dependencies.
5. `yarn start` to launch the Expo development server.

## Sign up & Sign in configuration

For the sign up flow to work as demonstrated, you need to log into your [Clerk Dashboard](https://dashboard.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter) and make sure the following settings have been configured in **User & Authentication** and **Social login** sections:

1. In Contact information section enable **Email Address** and pick **Email verification code** method in the modal.
2. In Authentication factors section enable **Password** and **Email verification code**.
3. In Personal information, enable **Name** to use first and last names during sign up
4. In Social Login, enable **Google** Oauth provider.

## Learn more

To learn more about Clerk and Expo, take a look at our
[official documentation](https://reference.clerk.dev/reference/clerk-expo?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter).

## Having trouble?

If you find any bug, something is not working as expected or you would like to see if we can support your use case, you can reach out to any of our [support channels](https://clerk.dev/support?utm_source=github&utm_medium=starters&utm_campaign=expo_starter), or just open a new issue!
