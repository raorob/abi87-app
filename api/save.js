context.log("API wurde aufgerufen");

const { Octokit } = require("@octokit/rest");

module.exports = async function (context, req) {
  try {
    const token = process.env.GITHUB_TOKEN;
    context.log("TOKEN:", process.env.GITHUB_TOKEN ? "OK" : "FEHLT");

    if (!token) {
      return {
        status: 500,
        body: "Missing GitHub token"
      };
    }

    const octokit = new Octokit({ auth: token });

    const owner = "robrao";
    const repo = "abi87-app";
    const path = "public/data.json";

    // Neue Daten aus Request
    const newData = req.body;

    // Alte Datei holen
    const { data: file } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });

    const sha = file.sha;

    // Neue Datei Base64 encodieren
    const content = Buffer.from(JSON.stringify(newData, null, 2)).toString("base64");

    // Datei aktualisieren
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "update data.json",
      content,
      sha
    });

    context.log("Daten erfolgreich gespeichert");
    return {
      status: 200,
      body: "OK"
    };

  } catch (err) {
    context.log(err);
    return {
      status: 500,
      body: "Error: " + err.message
    };
  }
};
