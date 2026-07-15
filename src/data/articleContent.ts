export interface ArticleContent {
  subtitle: string;
  introduction: string;
  sections: { heading: string; body: string; code?: string }[];
  conclusion: string;
}

export const articleContent: Record<string, ArticleContent> = {
  'database-isolation-prisma-workflows': {
    subtitle: 'Solve schema migration conflicts and boost development speed with branch-specific MySQL clones.',
    introduction: 'In modern teams, schema migration conflicts are a constant bottleneck when developers share a single development or staging database. When multiple engineers pull feature branches that alter the schema (e.g. running prisma migrate dev), collisions are inevitable. This article details how database isolation per feature branch fixes this bottleneck, enabling parallel feature pipelines without database collisions.',
    sections: [
      {
        heading: 'The Migration Collision Problem',
        body: "When two developers, Alice and Bob, work on separate feature branches containing database schema changes, they both create and run migrations. If they are pointing to a shared database container or development cluster, Alice's migration might overwrite or conflict with Bob's table structures, rendering Bob's local backend broken and out of sync.",
      },
      {
        heading: 'Introducing Featify CLI Isolation',
        body: 'Feature Branch Database Isolation automates database cloning. The tool clones the base development database (including seed data) into branch-specific databases dynamically whenever a developer checks out a new branch. This ensures Alice works on `db_feat_user_auth` and Bob works on `db_feat_payment_gateway`, eliminating any overlap.',
        code: `// .featify.config.js\nmodule.exports = {\n  host: "localhost",\n  user: "root",\n  password: "password123",\n  baseDatabase: "dev_mydb",\n  branchPrefix: "dev_branch_",\n  isolationTool: "mysql-client",\n};`,
      },
      {
        heading: 'Automating Database Cloning',
        body: 'By hooking into git checkout events or using a simple CLI wrapper, we can detect the active branch name, create an isolated database clone on the fly, and dynamically rewrite the local `.env` file containing the `DATABASE_URL`. In Prisma, this maps directly to branch-isolated query flows.',
        code: `# CLI execution to isolate active branch\nfeatify isolate --branch feat/email-service\n\n# Automatically updates .env:\n# DATABASE_URL="mysql://root:password123@localhost:3306/dev_branch_feat_email_service"`,
      },
    ],
    conclusion: 'Isolating databases per feature branch eliminates schema conflicts, speeds up local testing, and gives developers full freedom to experiment with schemas safely. Try adopting FEATIFY in your Prisma workflows to keep migrations smooth and developer velocity high.',
  },
  'voice-ai-agent-twilio-deepgram-nodejs': {
    subtitle: 'Step-by-step guide to connecting Twilio Media Streams, Deepgram transcription, and LLMs over low-latency WebSockets.',
    introduction: 'Conversational Voice AI agents are transforming customer experiences by making citizen and customer interactions instant. Building a low-latency, real-time voice bot requires connecting multiple async pipelines. This article details how to channel Twilio audio streams over WebSockets to Deepgram, route transcribed speech to an LLM, and return immediate synthesized speech.',
    sections: [
      {
        heading: 'Architecture Overview',
        body: 'The voice pipeline is structured into three asynchronous loops:\n1. Twilio establishes a phone call and streams inbound audio over a persistent WebSocket connection in raw mu-law format.\n2. The Node.js WebSocket server forwards this audio stream to the Deepgram Transcription API for sub-second Speech-to-Text.\n3. The transcribed text is sent to an LLM (such as GPT-4 or Claude via OpenRouter) to generate a response, which is converted to audio and sent back to Twilio.',
      },
      {
        heading: 'Handling Twilio Media Streams',
        body: 'Twilio uses TwiML to initiate a WebSocket connection. Once active, Twilio sends JSON frames containing base64 encoded audio payloads. We parse these frames and stream the binary buffers to Deepgram.',
        code: `// Initiating Twilio WebSocket connection in Node.js/Express\napp.post('/incoming-call', (req, res) => {\n  res.type('text/xml');\n  res.send(\`\n    <Response>\n      <Connect>\n        <Stream url="wss://yourdomain.com/media-stream" />\n      </Connect>\n    </Response>\n  \`);\n});`,
      },
      {
        heading: 'Deepgram Low-Latency Streaming',
        body: "Deepgram's real-time streaming endpoint accepts raw audio buffers over WebSockets. It returns transcriptions in real-time, firing callback events containing interim and final transcripts.",
        code: `// Forwarding raw buffers to Deepgram\nconst { createClient } = require("@deepgram/sdk");\nconst deepgram = createClient(process.env.DEEPGRAM_API_KEY);\n\nconst connection = deepgram.listen.live({\n  encoding: "mulaw",\n  sample_rate: 8000,\n  channels: 1,\n});\n\nconnection.on("transcript", (data) => {\n  const text = data.channel.alternatives[0].transcript;\n  if (data.is_final && text.trim().length > 0) {\n    console.log("Transcribed Text:", text);\n    // Send text to LLM pipeline...\n  }\n});`,
      },
    ],
    conclusion: 'By chaining Twilio, Deepgram, and LLM routes together in Node.js, we create responsive conversational systems. Minimizing package hops and using fast WebSockets ensures the overall audio loop response remains well under 1.5 seconds, mimicking natural human conversations.',
  },
  'scaffolding-nodejs-services-cli': {
    subtitle: 'Bootstrapping new microservices with standardized structures, CRUD actions, soft-delete, and zero configuration.',
    introduction: 'In modular monoliths and microservice environments, maintaining consistency in folders, tests, and configuration setups is hard. When developers scaffold folders manually, design details drift. This article walks through scaffolding standard services using Node.js CLI tooling.',
    sections: [
      {
        heading: 'Standardizing Backend Services',
        body: 'A production-ready service file needs multiple layers: controllers, service modules, data models, Prisma schemas, routing configurations, and unit tests. Creating these files manually is repetitive and leads to developers choosing non-standard configurations.',
      },
      {
        heading: 'Interactive Prompts with Clack',
        body: 'Using Clack prompts (`@clack/prompts`) provides an interactive, beautiful terminal experience. We prompt the developer for the entity name, target directory, database type, and CRUD choices.',
        code: `import * as p from '@clack/prompts';\n\nconst name = await p.text({\n  message: 'What is the name of your service entity?',\n  placeholder: 'users',\n});\n\nconst crud = await p.confirm({\n  message: 'Generate boilerplate CRUD endpoints with soft-delete?',\n});`,
      },
      {
        heading: 'Template Engine Boilerplates',
        body: 'We can utilize simple template strings to generate file boilerplates. Below is a sample ES Module controller template generator:',
        code: `export function controllerTemplate(entity) {\n  const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1);\n  return \`\nimport { \${capitalized}Service } from '../services/\${entity}.service.js';\n\nexport class \${capitalized}Controller {\n  static async getAll(req, res) {\n    const data = await \${capitalized}Service.find();\n    return res.json({ success: true, data });\n  }\n}\n  \`;\n}`,
      },
    ],
    conclusion: 'Integrating scaffolding tooling (like SKELR) into your development workflows speeds up backend bootstrapping, enforces consistency, and saves developers from copying and pasting legacy templates.',
  },
  'browser-native-encryption-web-crypto': {
    subtitle: 'Implement Zero-Knowledge cryptography using AES-256-CBC directly inside client web viewports.',
    introduction: "Security-focused applications require zero-knowledge encryption: files and texts must be encrypted in the client viewport before transferring them over the internet. This prevents cloud operators and database servers from reading user data. This article explores how to implement secure, hardware-accelerated AES-256-CBC encryption using the browser's native Web Crypto API.",
    sections: [
      {
        heading: 'The Power of Web Crypto API',
        body: 'Modern browsers include the Web Crypto API (`window.crypto.subtle`), which executes cryptographic operations natively in compiled browser code. This is significantly faster and safer than importing large, third-party JavaScript libraries like CryptoJS, which lack hardware acceleration.',
      },
      {
        heading: 'Generating the Encryption Key',
        body: 'First, we derive an encryption key from a user password. Using PBKDF2 (Password-Based Key Derivation Function 2) with a random salt secures the key against brute-force attacks.',
        code: `async function deriveKey(password, salt) {\n  const enc = new TextEncoder();\n  const baseKey = await window.crypto.subtle.importKey(\n    "raw",\n    enc.encode(password),\n    "PBKDF2",\n    false,\n    ["deriveKey"]\n  );\n  \n  return window.crypto.subtle.deriveKey(\n    {\n      name: "PBKDF2",\n      salt: salt,\n      iterations: 100000,\n      hash: "SHA-256"\n    },\n    baseKey,\n    { name: "AES-CBC", length: 256 },\n    false,\n    ["encrypt", "decrypt"]\n  );\n}`,
      },
      {
        heading: 'Executing AES-256-CBC Encryption',
        body: 'We generate a random Initialization Vector (IV) for every encryption run, perform the native encryption, and return the IV combined with the ciphertext.',
        code: `async function encryptData(plaintext, password) {\n  const enc = new TextEncoder();\n  const salt = window.crypto.getRandomValues(new Uint8Array(16));\n  const iv = window.crypto.getRandomValues(new Uint8Array(16));\n  \n  const key = await deriveKey(password, salt);\n  const ciphertext = await window.crypto.subtle.encrypt(\n    { name: "AES-CBC", iv: iv },\n    key,\n    enc.encode(plaintext)\n  );\n  \n  return { ciphertext, salt, iv };\n}`,
      },
    ],
    conclusion: 'Zero-knowledge browser-native encryption using the Web Crypto API protects user assets from database breaches and network sniffers. Utilizing AES-256-CBC ensures enterprise-grade security with native browser performance.',
  },
};
