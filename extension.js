const path = require("path");
const vscode = require("vscode");
const { LanguageClient, TransportKind } = require("vscode-languageclient/node");

function activate(context) {
  const serverModule = context.asAbsolutePath(path.join("server.js"));

  const serverOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc },
  };

  const clientOptions = {
    documentSelector: [{ scheme: "file", language: "eventmacro" }],
  };

  const client = new LanguageClient(
    "eventMacroLangServer",
    "eventMacro Language Server",
    serverOptions,
    clientOptions,
  );
  context.subscriptions.push(client.start());
}

exports.activate = activate;
