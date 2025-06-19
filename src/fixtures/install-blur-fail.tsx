export const FIXTURE_INSTALL_BLUR = [
  {
    id: "uSfEFfT9c8Pcetgw",
    createdAt: "2025-06-19T18:49:09.589Z",
    role: "user",
    content: "Render a blur view",
    parts: [
      {
        type: "text",
        text: "Render a blur view",
      },
    ],
  },
  {
    id: "msg-dGqe7QR6bn7qDSXGSQH5yTBf",
    createdAt: "2025-06-19T18:49:10.419Z",
    role: "assistant",
    content:
      "It seems there is an issue with resolving the `expo-blur` module. This might be due to a problem with the installation or configuration of the package. Please ensure that your project is correctly set up with Expo and that all dependencies are properly installed. You can try running `expo install expo-blur` in your project directory to ensure the package is installed correctly. If the problem persists, you might need to check your project's configuration or consult the Expo documentation for further troubleshooting.",
    parts: [
      {
        type: "step-start",
      },
      {
        type: "tool-invocation",
        toolInvocation: {
          state: "result",
          step: 0,
          toolCallId: "call_37kF488VTn0UTL6oo7JCANdL",
          toolName: "generateCode",
          args: {
            code: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport { BlurView } from 'expo-blur';\n\nconst BlurViewExample = () => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <BlurView intensity={50} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>\n        <Text style={{ color: 'white', fontSize: 20 }}>Blurred View</Text>\n      </BlurView>\n    </View>\n  );\n};\n\nexport default BlurViewExample;",
            language: "jsx",
          },
          result: {
            code: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport { BlurView } from 'expo-blur';\n\nconst BlurViewExample = () => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <BlurView intensity={50} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>\n        <Text style={{ color: 'white', fontSize: 20 }}>Blurred View</Text>\n      </BlurView>\n    </View>\n  );\n};\n\nexport default BlurViewExample;",
            language: "jsx",
            evaluationResult: {
              success: false,
              error:
                "Unable to resolve module expo-blur from /Users/evanbacon/Documents/GitHub/examples/with-router-ai/.expo/ai-cache/index-pbm6hryf3j.tsx: expo-blur could not be found within the project or in these directories:\n  node_modules\n  ../../node_modules\n\u001b[0m \u001b[90m 1 |\u001b[39m \u001b[36mimport\u001b[39m \u001b[33mReact\u001b[39m \u001b[36mfrom\u001b[39m \u001b[32m'react'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 2 |\u001b[39m \u001b[36mimport\u001b[39m { \u001b[33mView\u001b[39m\u001b[33m,\u001b[39m \u001b[33mText\u001b[39m } \u001b[36mfrom\u001b[39m \u001b[32m'react-native'\u001b[39m\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 3 |\u001b[39m \u001b[36mimport\u001b[39m { \u001b[33mBlurView\u001b[39m } \u001b[36mfrom\u001b[39m \u001b[32m'expo-blur'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m   |\u001b[39m                           \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 4 |\u001b[39m\n \u001b[90m 5 |\u001b[39m \u001b[36mconst\u001b[39m \u001b[33mBlurViewExample\u001b[39m \u001b[33m=\u001b[39m () \u001b[33m=>\u001b[39m {\n \u001b[90m 6 |\u001b[39m   \u001b[36mreturn\u001b[39m (\u001b[0m",
            },
          },
        },
      },
      {
        type: "step-start",
      },
      {
        type: "tool-invocation",
        toolInvocation: {
          state: "result",
          step: 1,
          toolCallId: "call_PXizPkRgMDPsc6CUNyfCr5EH",
          toolName: "installDependencies",
          args: {
            packages: ["expo-blur"],
          },
          result: {
            success: true,
            installed: ["expo-blur"],
          },
        },
      },
      {
        type: "step-start",
      },
      {
        type: "tool-invocation",
        toolInvocation: {
          state: "result",
          step: 2,
          toolCallId: "call_47Zk8zPbwOHyMgOsWfNm3wby",
          toolName: "generateCode",
          args: {
            code: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport { BlurView } from 'expo-blur';\n\nconst BlurViewExample = () => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <BlurView intensity={50} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>\n        <Text style={{ color: 'white', fontSize: 20 }}>Blurred View</Text>\n      </BlurView>\n    </View>\n  );\n};\n\nexport default BlurViewExample;",
            language: "jsx",
          },
          result: {
            code: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport { BlurView } from 'expo-blur';\n\nconst BlurViewExample = () => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <BlurView intensity={50} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>\n        <Text style={{ color: 'white', fontSize: 20 }}>Blurred View</Text>\n      </BlurView>\n    </View>\n  );\n};\n\nexport default BlurViewExample;",
            language: "jsx",
            evaluationResult: {
              success: false,
              error:
                "Unable to resolve module expo-blur from /Users/evanbacon/Documents/GitHub/examples/with-router-ai/.expo/ai-cache/index-sb7wsq9bp9a.tsx: expo-blur could not be found within the project or in these directories:\n  node_modules\n  ../../node_modules\n\u001b[0m \u001b[90m 1 |\u001b[39m \u001b[36mimport\u001b[39m \u001b[33mReact\u001b[39m \u001b[36mfrom\u001b[39m \u001b[32m'react'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 2 |\u001b[39m \u001b[36mimport\u001b[39m { \u001b[33mView\u001b[39m\u001b[33m,\u001b[39m \u001b[33mText\u001b[39m } \u001b[36mfrom\u001b[39m \u001b[32m'react-native'\u001b[39m\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 3 |\u001b[39m \u001b[36mimport\u001b[39m { \u001b[33mBlurView\u001b[39m } \u001b[36mfrom\u001b[39m \u001b[32m'expo-blur'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m   |\u001b[39m                           \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 4 |\u001b[39m\n \u001b[90m 5 |\u001b[39m \u001b[36mconst\u001b[39m \u001b[33mBlurViewExample\u001b[39m \u001b[33m=\u001b[39m () \u001b[33m=>\u001b[39m {\n \u001b[90m 6 |\u001b[39m   \u001b[36mreturn\u001b[39m (\u001b[0m",
            },
          },
        },
      },
      {
        type: "step-start",
      },
      {
        type: "text",
        text: "It seems there is an issue with resolving the `expo-blur` module. This might be due to a problem with the installation or configuration of the package. Please ensure that your project is correctly set up with Expo and that all dependencies are properly installed. You can try running `expo install expo-blur` in your project directory to ensure the package is installed correctly. If the problem persists, you might need to check your project's configuration or consult the Expo documentation for further troubleshooting.",
      },
    ],
    toolInvocations: [
      {
        state: "result",
        step: 0,
        toolCallId: "call_37kF488VTn0UTL6oo7JCANdL",
        toolName: "generateCode",
        args: {
          code: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport { BlurView } from 'expo-blur';\n\nconst BlurViewExample = () => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <BlurView intensity={50} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>\n        <Text style={{ color: 'white', fontSize: 20 }}>Blurred View</Text>\n      </BlurView>\n    </View>\n  );\n};\n\nexport default BlurViewExample;",
          language: "jsx",
        },
        result: {
          code: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport { BlurView } from 'expo-blur';\n\nconst BlurViewExample = () => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <BlurView intensity={50} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>\n        <Text style={{ color: 'white', fontSize: 20 }}>Blurred View</Text>\n      </BlurView>\n    </View>\n  );\n};\n\nexport default BlurViewExample;",
          language: "jsx",
          evaluationResult: {
            success: false,
            error:
              "Unable to resolve module expo-blur from /Users/evanbacon/Documents/GitHub/examples/with-router-ai/.expo/ai-cache/index-pbm6hryf3j.tsx: expo-blur could not be found within the project or in these directories:\n  node_modules\n  ../../node_modules\n\u001b[0m \u001b[90m 1 |\u001b[39m \u001b[36mimport\u001b[39m \u001b[33mReact\u001b[39m \u001b[36mfrom\u001b[39m \u001b[32m'react'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 2 |\u001b[39m \u001b[36mimport\u001b[39m { \u001b[33mView\u001b[39m\u001b[33m,\u001b[39m \u001b[33mText\u001b[39m } \u001b[36mfrom\u001b[39m \u001b[32m'react-native'\u001b[39m\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 3 |\u001b[39m \u001b[36mimport\u001b[39m { \u001b[33mBlurView\u001b[39m } \u001b[36mfrom\u001b[39m \u001b[32m'expo-blur'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m   |\u001b[39m                           \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 4 |\u001b[39m\n \u001b[90m 5 |\u001b[39m \u001b[36mconst\u001b[39m \u001b[33mBlurViewExample\u001b[39m \u001b[33m=\u001b[39m () \u001b[33m=>\u001b[39m {\n \u001b[90m 6 |\u001b[39m   \u001b[36mreturn\u001b[39m (\u001b[0m",
          },
        },
      },
      {
        state: "result",
        step: 1,
        toolCallId: "call_PXizPkRgMDPsc6CUNyfCr5EH",
        toolName: "installDependencies",
        args: {
          packages: ["expo-blur"],
        },
        result: {
          success: true,
          installed: ["expo-blur"],
        },
      },
      {
        state: "result",
        step: 2,
        toolCallId: "call_47Zk8zPbwOHyMgOsWfNm3wby",
        toolName: "generateCode",
        args: {
          code: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport { BlurView } from 'expo-blur';\n\nconst BlurViewExample = () => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <BlurView intensity={50} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>\n        <Text style={{ color: 'white', fontSize: 20 }}>Blurred View</Text>\n      </BlurView>\n    </View>\n  );\n};\n\nexport default BlurViewExample;",
          language: "jsx",
        },
        result: {
          code: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport { BlurView } from 'expo-blur';\n\nconst BlurViewExample = () => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <BlurView intensity={50} style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>\n        <Text style={{ color: 'white', fontSize: 20 }}>Blurred View</Text>\n      </BlurView>\n    </View>\n  );\n};\n\nexport default BlurViewExample;",
          language: "jsx",
          evaluationResult: {
            success: false,
            error:
              "Unable to resolve module expo-blur from /Users/evanbacon/Documents/GitHub/examples/with-router-ai/.expo/ai-cache/index-sb7wsq9bp9a.tsx: expo-blur could not be found within the project or in these directories:\n  node_modules\n  ../../node_modules\n\u001b[0m \u001b[90m 1 |\u001b[39m \u001b[36mimport\u001b[39m \u001b[33mReact\u001b[39m \u001b[36mfrom\u001b[39m \u001b[32m'react'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 2 |\u001b[39m \u001b[36mimport\u001b[39m { \u001b[33mView\u001b[39m\u001b[33m,\u001b[39m \u001b[33mText\u001b[39m } \u001b[36mfrom\u001b[39m \u001b[32m'react-native'\u001b[39m\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 3 |\u001b[39m \u001b[36mimport\u001b[39m { \u001b[33mBlurView\u001b[39m } \u001b[36mfrom\u001b[39m \u001b[32m'expo-blur'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m   |\u001b[39m                           \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 4 |\u001b[39m\n \u001b[90m 5 |\u001b[39m \u001b[36mconst\u001b[39m \u001b[33mBlurViewExample\u001b[39m \u001b[33m=\u001b[39m () \u001b[33m=>\u001b[39m {\n \u001b[90m 6 |\u001b[39m   \u001b[36mreturn\u001b[39m (\u001b[0m",
          },
        },
      },
    ],
    revisionId: "p39xhF6j6X2TsKTr",
  },
];
