import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";

import { evalReactCode } from "@/actions/metro-eval";

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log("post messages:", messages);

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    toolCallStreaming: true,
    system: `
    You are a helpful coding assistant. 
    When asked to write code, use the generateCode tool to provide the code in the requested language (default to JavaScript if not specified). 
    Do not include the code in the text response; only provide an explanation or description of the code. 
    If the user doesn't request code explicitly, respond with text unless code is implied by the context.

    Always use Expo tools and libraries.
    Always use React Native components.
    Ensure to always import all necessary dependencies at the top of the code snippet.
    Never omit code or imports.
    No comments in the code.
    Always return a React component that is exported as default.
    
    Never use axios, always use fetch for API requests.
    If code evaluation fails due to a missing dependency, use the installDependencies tool to install the required package and retry evaluation.

    `,
    tools: {
      generateCode: tool({
        description: "Generate code based on user request",
        parameters: z.object({
          code: z.string().describe("The generated code"),
          language: z
            .string()
            .describe(
              "The programming language as a syntax code like js, ts, tsx"
            ),
        }),
        execute: async ({ code, language }) => {
          // Evaluate the code on the server
          const evaluationResult = await bundleCodeAsync(code);
          return {
            code,
            language: language.toLowerCase(),
            evaluationResult,
          };
        },
      }),

      installDependencies: tool({
        description: "Install missing dependencies for the code",
        parameters: z.object({
          packages: z
            .array(z.string())
            .describe("List of package names to install"),
        }),
        execute: async ({ packages }) => {
          console.log("tool: Installing packages:", packages);
          try {
            await installPackages(packages);
            return { success: true, installed: packages };
          } catch (error) {
            return { success: false, error: error.message };
          }
        },
      }),
    },
  });

  return result.toDataStreamResponse({
    getErrorMessage: __DEV__ ? errorHandler : undefined,
    headers: {
      // Issue with iOS NSURLSession that requires Content-Type set in order to enable streaming.
      // https://github.com/expo/expo/issues/32950#issuecomment-2508297646
      "Content-Type": "application/octet-stream",
    },
  });
}

// Server-side code evaluation
async function bundleCodeAsync(code) {
  try {
    // Don't return code so it isn't added to the context window.
    await evalReactCode(code);
    return {
      success: true,
      // bundledJs: await evalReactCode(code)
    };
  } catch (error) {
    // Parse error for missing dependencies
    const missingPackage = extractMissingPackage(error.message);
    if (missingPackage) {
      return {
        success: false,
        error: "Missing dependency",
        toolCall: {
          name: "installDependencies",
          arguments: { packages: [missingPackage] },
        },
      };
    }
    return { success: false, error: error.message };
  }
}

// Extract package name from error message
function extractMissingPackage(errorMessage) {
  // Example: "Cannot find module 'lodash'"
  const match = errorMessage.match(/Cannot find module '([^']+)'/);
  return match ? match[1] : null;
}

// Install packages using npm or expo
async function installPackages(packages) {
  console.log("Installing packages:", packages, "in", process.cwd());
  const command = `npx expo install ${packages.join(" ")}`;
  await execAsync(command, { cwd: process.cwd() });
}

const execAsync = promisify(exec);
// Error handler
function errorHandler(error) {
  if (error == null) return "unknown error";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}
