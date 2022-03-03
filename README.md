# Clerk Expo Starter

This starter project shows how to use [Clerk](https://www.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter) with [Expo](https://expo.dev/) to authenticate users in your [React Native](https://reactnative.dev/) application. When users sign up or sign in, Clerk handles the state of the authentication and renders public or [protected routes](https://reactnavigation.org/docs/auth-flow).

## Demo

<img src="./docs/demo.gif" width="300">

## How to use

To run the example locally you need to:

1. Sign up at [Clerk.dev](https://www.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter).
2. Go to your [Clerk dashboard](https://dashboard.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter) and create an application.
3. Set your Frontend API key in `App.tsx`.
4. `yarn` to install the required dependencies.
5. `yarn start` to launch the Expo development server.

## Sign up configuration

For the sign up flow to work as demonstrated, you need to log into your [Clerk dashboard](https://dashboard.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter) and make sure the following settings have been configured:

1. **User Model** > **Profile** > **Name** set ON (for first and last names)
2. **Authentication** > **Standard Form Fields** > **Standard form fields authentication** set ON (should be the default)
3. **Authentication** > **Standard Form Fields** > **Authentication strategy** set to **Passwordless**, click the gear icon and choose **One-time codes** then apply changes. You can then change it back to **Password**. (This is due to a regression bug we're working on.)

## Learn more

To learn more about Clerk and Expo, take a look at our
[official documentation](https://docs.clerk.dev/reference/clerk-expo?utm_source=github&utm_medium=starter_repos&utm_campaign=expo_starter).

## Having trouble?

If you find any bug, something is not working as expected or you would like to see if we can support your use case, you can reach out to any of our [support channels](https://clerk.dev/support?utm_source=github&utm_medium=starters&utm_campaign=expo_starter), or just open a new issue!
