"use server";

import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

async function writeTempFile(code: string) {
  // Make random
  const randomId = Math.random().toString(36).substring(2, 15);
  const tempFilePath = path.join(
    projectRoot,
    ".expo/ai-cache",
    `index-${randomId}.tsx`
  );
  await fs.promises.mkdir(path.dirname(tempFilePath), { recursive: true });
  await fs.promises.writeFile(tempFilePath, code);

  await new Promise((resolve) => setTimeout(resolve, 600));
  return tempFilePath;
}

class MetroServerError extends Error {
  code = "METRO_SERVER_ERROR";

  constructor(
    errorObject: { message: string } & Record<string, any>,
    public url: string
  ) {
    super(errorObject.message);
    this.name = "MetroServerError";

    for (const key in errorObject) {
      (this as any)[key] = errorObject[key];
    }
  }
}

class ReactServerError extends Error {
  code = "REACT_SERVER_ERROR";

  constructor(
    message: string,
    public url: string,
    public statusCode: number,
    /** Response headers from the server. */
    public headers: Headers
  ) {
    super(message);
    this.name = "ReactServerError";
  }
}

interface ResponseLike {
  url: string;
  ok: boolean;
  status: number;
  statusText: string;
  headers: Headers;
  text(): Promise<string>;
}

const checkStatus = async <T extends ResponseLike>(
  responsePromise: Promise<T>
): Promise<T> => {
  // TODO: Combine with metro async fetch logic.
  const response = await responsePromise;
  if (!response.ok) {
    // NOTE(EvanBacon): Transform the Metro development error into a JS error that can be used by LogBox.
    // This was tested against using a Class component in a server component.
    if (__DEV__ && (response.status === 500 || response.status === 404)) {
      const errorText = await response.text();
      let errorJson: any;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        // `Unable to resolve module` error should respond as JSON from the dev server and sent to the master red box, this can get corrupt when it's returned as the formatted string.
        if (errorText.startsWith("Unable to resolve module")) {
          console.error("Unexpected Metro error format from dev server");
          // This is an unexpected state that occurs when the dev server renderer does not throw Metro errors in the expected JSON format.
          throw new Error(errorJson);
        }
        throw new ReactServerError(
          errorText,
          response.url,
          response.status,
          response.headers
        );
      }

      throw new MetroServerError(errorJson, response.url);
    }

    let responseText: string;
    try {
      responseText = await response.text();
    } catch {
      throw new ReactServerError(
        response.statusText,
        response.url,
        response.status,
        response.headers
      );
    }
    throw new ReactServerError(
      responseText,
      response.url,
      response.status,
      response.headers
    );
  }
  return response;
};

export async function evalReactCode(code: string): Promise<string> {
  const p = await writeTempFile(code);

  const relativePath = path.relative(projectRoot, p);

  const res = await checkStatus(
    fetch(
      `http://localhost:8081/${relativePath}.bundle?platform=${process.env.EXPO_OS}&dev=true&hot=false&lazy=true&transform.engine=hermes&modulesOnly=true`
    )
  );
  const bundle = await res.text();
  return bundle.replace(/__r\(([^)]+)\);?$/, "return __r($1);");
}
