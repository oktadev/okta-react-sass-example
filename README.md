# React Sass Example
 
This example shows how to use Sass with React to build beautiful apps.

Please read [Use Sass with React to Build Beautiful Apps](https://developer.okta.com/blog/2019/12/17/react-sass) to see how this app was created.

**Prerequisites:** [Node.js](https://nodejs.org/) v10+. 

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-react-sass-example.git
cd okta-react-sass-example
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

Run the app using:
 
```bash
npm install
npm start
```

### Create a New OIDC App in Okta

To create a new OIDC app on Okta:

1. Log in to your developer account (or [create a free one](https://developer.okta.com/signup)).
2. Navigate to **Applications**, and click on **Add Application**.
3. Select **Single-Page App** and click **Next**. 
4. Give the application a name, change all instances of `http://localhost:8080` to `http://localhost:3000` and click **Done**.

Set your `issuer` and copy the `clientId` in to `src/App.js`. 

```js
const config = {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  redirect_uri: window.location.origin + '/callback',
  client_id: '{yourClientId}',
  pkce: true
};
```

You should now be able to log in and use this app's calculator feature at `http://localhost:3000`.

## Links

This example uses the following open source libraries from Okta:

* [Okta React SDK](https://github.com/okta/okta-react)

## Help

Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2019/12/17/react-sass), or visit our [Okta Developer Forums](https://devforum.okta.com/). 

## License

Apache 2.0, see [LICENSE](LICENSE).
