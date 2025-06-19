import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { KeyboardPaddingView } from "@/components/keyboard-padding";
import { evalReactCode } from "@/actions/metro-eval";
import SyntaxDom from "./syntax-dom";
import MD from "react-native-markdown-renderer";

import * as AC from "@bacons/apple-colors";

import * as Fonts from "@/constants/fonts";

import Ionicons from "@expo/vector-icons/Ionicons";

export function Chat() {
  const [bundlingError, setBundlingError] = useState(null);
  const {
    messages,
    isLoading,
    error,
    handleInputChange,
    input,
    handleSubmit,
    append,
  } = useChat({
    maxSteps: 5,
    onFinish(message) {
      scrollViewRef.current?.scrollToEnd({ animated: true });

      console.log("Message finished:", message);
      const toolInvocation = message.parts.findLast((part) => {
        return (
          part.type === "tool-invocation" &&
          part.toolInvocation.state === "result" &&
          part.toolInvocation.result?.evaluationResult
        );
      });

      if (toolInvocation) {
        const { code, evaluationResult } = toolInvocation.toolInvocation.result;
        if (evaluationResult.success) {
          // Perform client-side evaluation
          evalReactCode(code)
            .then((result) => {
              const moduleExport = eval(result);
              const Component =
                "__esModule" in moduleExport
                  ? moduleExport.default
                  : moduleExport;

              if (Component) {
                console.log("Evaluated Component:", Component);
                setPreviewComponent(<Component />);
                setBundlingError(null);
              } else {
                setBundlingError("No valid React component exported");
              }
            })
            .catch((evalError) => {
              setBundlingError(
                `Client-side evaluation failed: ${evalError.message}`
              );
            });
        } else if (evaluationResult.toolCall) {
          console.log("Installing dependencies:", evaluationResult.toolCall);
          setBundlingError(
            `Installing dependency: ${evaluationResult.toolCall.arguments.packages.join(
              ", "
            )}`
          );
        } else {
          setBundlingError(`Bundling failed: ${evaluationResult.error}`);
        }
      }
    },
  });

  // Determine if bundling is in progress
  const isBundling =
    isLoading ||
    messages.some((msg) =>
      msg.parts.some(
        (part) =>
          part.type === "tool-invocation" &&
          part.toolInvocation.toolName === "generateCode" &&
          part.toolInvocation.state === "partial-call"
      )
    );

  // Check if screenshot is being sent
  const isSendingScreenshot = messages.some((msg) =>
    msg.parts.some(
      (part) =>
        part.type === "tool-invocation" &&
        part.toolInvocation.toolName === "saveViewShot" &&
        part.toolInvocation.state === "partial-call"
    )
  );

  const [previewComponent, setPreviewComponent] =
    useState<React.ComponentType | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Text style={{ color: "red", textAlign: "center" }} selectable>
          {error.message}
        </Text>
      </View>
    );
  }

  const hasPreview = !!previewComponent;
  return (
    <View style={{ flex: 1, backgroundColor: AC.systemBackground }}>
      {hasPreview && (
        <View
          style={{
            margin: 16,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: AC.secondarySystemGroupedBackground,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            padding: 16,
            maxHeight: 300,
            height: 300,
            borderRadius: 12,
            flex: 1,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: AC.separator,
            borderCurve: "continuous",
            opacity: isBundling ? 0.5 : 1,
          }}
        >
          {isBundling && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={AC.secondaryLabel} />
              <Text style={styles.loadingText}>Bundling code...</Text>
            </View>
          )}
          {isSendingScreenshot && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={AC.secondaryLabel} />
              <Text style={styles.loadingText}>Visually inspecting...</Text>
            </View>
          )}

          {bundlingError && (
            <Text style={styles.errorText}>{bundlingError}</Text>
          )}

          {!!previewComponent && !isBundling && !bundlingError && (
            <>{previewComponent}</>
          )}
        </View>
      )}
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, padding: 16 }}
        contentContainerStyle={{
          gap: 16,
          paddingVertical: 16,
          paddingTop: hasPreview ? 316 : 16,
        }}
      >
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
                key={message.id}
              >
                <View
                  style={{
                    padding: 8,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: AC.separator,
                    borderRadius: 16,
                    backgroundColor: AC.secondarySystemBackground,
                    borderCurve: "continuous",
                  }}
                >
                  <MDR>{message.content}</MDR>
                </View>
              </View>
            );
          }

          return (
            <View
              key={message.id}
              style={{
                padding: 8,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: AC.separator,
                borderRadius: 16,
                backgroundColor: AC.secondarySystemBackground,
                flex: 1,
                gap: 16,
              }}
            >
              {message.role === "user" ? (
                <MDR>{message.content}</MDR>
              ) : (
                <>
                  {message.parts?.map((part, index) => {
                    if (part.type === "text") {
                      return <MDR key={index}>{part.text}</MDR>;
                    } else if (part.type === "tool-invocation") {
                      const toolCall = part.toolInvocation;

                      if (toolCall.toolName === "installDependencies") {
                        // Add a card that looks like an npm install
                        const packages = toolCall.args?.packages || [];

                        // Make a little terminal UI

                        const isPending = toolCall.state === "partial-call";
                        const success =
                          toolCall.state === "result" &&
                          toolCall.result?.success;
                        const error =
                          toolCall.state === "result" && toolCall.result?.error;
                        return (
                          <View className="gap-2" key={index}>
                            <View className="p-4 flex-row items-center justify-between rounded-2xl bg-black border border-gray-700">
                              <Text
                                className="text-white text-base"
                                style={{
                                  fontFamily: Fonts.monospaced,
                                }}
                              >
                                <Text className="text-cyan-400">$</Text> npx
                                expo install {packages.join(" ")}
                              </Text>
                              {isPending && (
                                <ActivityIndicator
                                  size="small"
                                  color={AC.secondaryLabel}
                                />
                              )}
                              {success && (
                                <Ionicons
                                  name="checkmark-circle"
                                  size={24}
                                  color={AC.systemGreen}
                                />
                              )}
                            </View>
                            {error && (
                              <Text className="text-red-400" selectable>
                                Error: {error}
                              </Text>
                            )}
                          </View>
                        );
                      }

                      let code: string;
                      let language: string | undefined;

                      if (
                        toolCall.state === "partial-call" &&
                        toolCall.args?.code
                      ) {
                        code = toolCall.args.code;
                        language = toolCall.args.language;
                      } else if (
                        toolCall.state === "result" &&
                        toolCall.result?.code
                      ) {
                        code = toolCall.result.code;
                        language = toolCall.result.language;
                      }

                      return (
                        <SyntaxDom
                          key={index}
                          dom={{
                            style: {
                              backgroundColor: "#1E1E1E",
                              minHeight: 300,
                              borderRadius: 16,
                            },
                          }}
                          language={language ?? "tsx"}
                          code={code}
                        ></SyntaxDom>
                      );
                    }
                    return null;
                  })}
                </>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: "#374151",
          backgroundColor: "#1F2937",
        }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            value={input}
            onChange={(e) =>
              handleInputChange({
                ...e,
                target: {
                  ...e.target,
                  value: e.nativeEvent.text,
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            onSubmitEditing={(e) => {
              handleSubmit(e);
              e.preventDefault();
            }}
            placeholder="Ask for code (e.g., 'Write a React component')"
            placeholderTextColor="#9CA3AF"
            style={{
              flex: 1,
              backgroundColor: "#374151",
              color: "white",
              padding: 8,
              borderRadius: 8,
            }}
            editable={!isLoading}
          />
        </View>
        <KeyboardPaddingView />
      </View>
    </View>
  );
}

function MDR(props) {
  return (
    <MD
      {...props}
      style={{
        ...props.style,
        text: {
          ...(props.style?.text ?? {}),
          color: AC.label,
          fontSize: 16,
        },
        p: {
          ...(props.style?.text ?? {}),
          color: AC.label,
          fontSize: 16,
        },

        codeInline: {
          borderWidth: 1,
          borderColor: AC.separator,
          backgroundColor: AC.systemGray4,

          padding: 4,
          borderRadius: 4,
          color: AC.label,
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  errorContainer: {
    padding: 10,
    backgroundColor: "#FFE5E5",
    borderRadius: 8,
    margin: 10,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
  },
  previewContainer: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    padding: 10,
  },
});
