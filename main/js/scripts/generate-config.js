// Gera main/js/config.js durante o build da Vercel.
// A chave fica na variável de ambiente GOOGLE_DRIVE_API_KEY (Project Settings → Environment Variables).
// Sem a variável, o site continua funcionando com o fallback de biblioteca-dados.js.

const fs = require('fs');
const path = require('path');

const apiKey = (process.env.GOOGLE_DRIVE_API_KEY || '').trim();
const parentFolderId = (
    process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || '1N5kTne7aYPXn-N57nHIgYAUfW1V-5Uzx'
).trim();

if (!apiKey) {
    console.warn(
        '[config] GOOGLE_DRIVE_API_KEY não definida. Gerando config.js sem chave (a biblioteca usará o fallback).'
    );
}

const config = {
    drive: {
        apiKey,
        parentFolderId
    }
};

const content = `// Arquivo gerado automaticamente no build da Vercel — não editar manualmente.\n` +
    `// A chave vem da variável de ambiente GOOGLE_DRIVE_API_KEY.\n\n` +
    `window.CONEXAO_CONFIG = ${JSON.stringify(config, null, 4)};\n`;

const outputPath = path.join(__dirname, '..', 'js', 'config.js');
fs.writeFileSync(outputPath, content, 'utf8');
console.log(`[config] Gerado ${path.relative(process.cwd(), outputPath)}`);
