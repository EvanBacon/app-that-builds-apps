# Expo Router AI App Generator

> [Watch the stream where I built this](https://x.com/Baconbrix/status/1935792320143675469).

Build an app that makes apps with Expo Router!

Use [Expo Router](https://docs.expo.dev/router/introduction/) with [AI SDK](https://ai-sdk.dev/docs/getting-started/expo) and [Nativewind](https://www.nativewind.dev/v4/overview/) styling.

## 🚀 How to use

Add an [OpenAI API key](https://platform.openai.com/api-keys) to `.env`:

```sh
OPENAI_API_KEY=sk-proj-...
```

Finally you can start the app with `npx expo`.

## Deploy

> This project uses the local Metro bundler to evaluate React code, this won't work in production without a remote Metro instance running.

Ensure you set the `EXPO_UNSTABLE_DEPLOY_SERVER=1` environment variable to enable [parallel deployments](https://docs.expo.dev/router/reference/api-routes/#native-deployment) to the server.

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)
