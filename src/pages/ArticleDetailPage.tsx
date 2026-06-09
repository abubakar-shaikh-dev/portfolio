import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { articles } from '@/data/articles';

// Custom high-quality mock article content database based on slugs
const articleContent: Record<
  string,
  {
    subtitle: string;
    introduction: string;
    sections: { heading: string; body: string; code?: string }[];
    conclusion: string;
  }
> = {
  'database-isolation-prisma-workflows': {
    subtitle: 'Solve schema migration conflicts and boost development speed with branch-specific MySQL clones.',
    introduction: 'In modern teams, schema migration conflicts are a constant bottleneck when developers share a single development or staging database. When multiple engineers pull feature branches that alter the schema (e.g. running prisma migrate dev), collisions are inevitable. This article details how database isolation per feature branch fixes this bottleneck, enabling parallel feature pipelines without database collisions.',
    sections: [
      {
        heading: 'The Migration Collision Problem',
        body: 'When two developers, Alice and Bob, work on separate feature branches containing database schema changes, they both create and run migrations. If they are pointing to a shared database container or development cluster, Alice\'s migration might overwrite or conflict with Bob\'s table structures, rendering Bob\'s local backend broken and out of sync. Standard workflows try to bypass this by running local database instances, but maintaining local seed datasets and running local database clusters consumes excessive system memory and leads to configuration drifts.',
      },
      {
        heading: 'Introducing Featify CLI Isolation',
        body: 'Feature Branch Database Isolation automates database cloning. The tool clones the base development database (including seed data) into branch-specific databases dynamically whenever a developer checks out a new branch. This ensures Alice works on `db_feat_user_auth` and Bob works on `db_feat_payment_gateway`, eliminating any overlap.',
        code: `// .featify.config.js
module.exports = {
  host: "localhost",
  user: "root",
  password: "password123",
  baseDatabase: "dev_mydb",
  branchPrefix: "dev_branch_",
  isolationTool: "mysql-client",
};`,
      },
      {
        heading: 'Automating Database Cloning',
        body: 'By hooking into git checkout events or using a simple CLI wrapper, we can detect the active branch name, create an isolated database clone on the fly, and dynamically rewrite the local `.env` file containing the `DATABASE_URL`. In Prisma, this maps directly to branch-isolated query flows.',
        code: `# CLI execution to isolate active branch
featify isolate --branch feat/email-service

# Automatically updates .env:
# DATABASE_URL="mysql://root:password123@localhost:3306/dev_branch_feat_email_service"`,
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
        code: `// Initiating Twilio WebSocket connection in Node.js/Express
app.post('/incoming-call', (req, res) => {
  res.type('text/xml');
  res.send(\`
    <Response>
      <Connect>
        <Stream url="wss://yourdomain.com/media-stream" />
      </Connect>
    </Response>
  \`);
});`,
      },
      {
        heading: 'Deepgram Low-Latency Streaming',
        body: 'Deepgram\'s real-time streaming endpoint accepts raw audio buffers over WebSockets. It returns transcriptions in real-time, firing callback events containing interim and final transcripts.',
        code: `// Forwarding raw buffers to Deepgram
const { createClient } = require("@deepgram/sdk");
const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const connection = deepgram.listen.live({
  encoding: "mulaw",
  sample_rate: 8000,
  channels: 1,
});

connection.on("transcript", (data) => {
  const text = data.channel.alternatives[0].transcript;
  if (data.is_final && text.trim().length > 0) {
    console.log("Transcribed Text:", text);
    // Send text to LLM pipeline...
  }
});`,
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
        code: `import * as p from '@clack/prompts';

const name = await p.text({
  message: 'What is the name of your service entity?',
  placeholder: 'users',
});

const crud = await p.confirm({
  message: 'Generate boilerplate CRUD endpoints with soft-delete?',
});`,
      },
      {
        heading: 'Template Engine Boilerplates',
        body: 'We can utilize simple template strings to generate file boilerplates. Below is a sample ES Module controller template generator:',
        code: `export function controllerTemplate(entity) {
  const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1);
  return \`
import { \${capitalized}Service } from '../services/\${entity}.service.js';

export class \${capitalized}Controller {
  static async getAll(req, res) {
    const data = await \${capitalized}Service.find();
    return res.json({ success: true, data });
  }
}
  \`;
}`,
      },
    ],
    conclusion: 'Integrating scaffolding tooling (like SKELR) into your development workflows speeds up backend bootstrapping, enforces consistency, and saves developers from copying and pasting legacy templates.',
  },
  'browser-native-encryption-web-crypto': {
    subtitle: 'Implement Zero-Knowledge cryptography using AES-256-CBC directly inside client web viewports.',
    introduction: 'Security-focused applications require zero-knowledge encryption: files and texts must be encrypted in the client viewport before transferring them over the internet. This prevents cloud operators and database servers from reading user data. This article explores how to implement secure, hardware-accelerated AES-256-CBC encryption using the browser\'s native Web Crypto API.',
    sections: [
      {
        heading: 'The Power of Web Crypto API',
        body: 'Modern browsers include the Web Crypto API (`window.crypto.subtle`), which executes cryptographic operations natively in compiled browser code. This is significantly faster and safer than importing large, third-party JavaScript libraries like CryptoJS, which lack hardware acceleration.',
      },
      {
        heading: 'Generating the Encryption Key',
        body: 'First, we derive an encryption key from a user password. Using PBKDF2 (Password-Based Key Derivation Function 2) with a random salt secures the key against brute-force attacks.',
        code: `async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-CBC", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}`,
      },
      {
        heading: 'Executing AES-256-CBC Encryption',
        body: 'We generate a random Initialization Vector (IV) for every encryption run, perform the native encryption, and return the IV combined with the ciphertext.',
        code: `async function encryptData(plaintext, password) {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  
  const key = await deriveKey(password, salt);
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv },
    key,
    enc.encode(plaintext)
  );
  
  return { ciphertext, salt, iv };
}`,
      },
    ],
    conclusion: 'Zero-knowledge browser-native encryption using the Web Crypto API protects user assets from database breaches and network sniffers. Utilizing AES-256-CBC ensures enterprise-grade security with native browser performance.',
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);
  const content = slug ? articleContent[slug] : null;

  if (!article || !content) {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white">Article not found</h1>
            <p className="mt-4 text-text-secondary">
              The article you are looking for does not exist or has been moved.
            </p>
            <Link
              to="/thoughts"
              className="mt-8 inline-flex items-center gap-2 border border-border-primary bg-bg-secondary px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-all hover:border-accent-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Thoughts
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          {/* Back Link */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/thoughts"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to thoughts
            </Link>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent-orange"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy Link
            </button>
          </div>

          <motion.article
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
            <motion.header variants={itemVariants} className="space-y-4 border-b border-border-primary pb-8">
              <span className="inline-block border border-border-primary bg-bg-secondary px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider text-accent-orange">
                {article.category}
              </span>
              <h1 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex flex-wrap gap-6 pt-2 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent-orange" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent-orange" />
                  {article.readTime} read
                </span>
              </div>
            </motion.header>

            {/* Intro */}
            <motion.div variants={itemVariants} className="border-l-2 border-accent-orange pl-6 py-1">
              <p className="text-lg leading-relaxed text-text-secondary italic">
                {content.introduction}
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-12 py-4">
              {content.sections.map((section, idx) => (
                <motion.section key={idx} variants={itemVariants} className="space-y-4">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {section.heading}
                  </h2>
                  <p className="leading-relaxed text-text-secondary text-base">
                    {section.body}
                  </p>
                  {section.code && (
                    <div className="border border-border-primary bg-[#0f0f0f] p-5 font-mono text-sm leading-relaxed text-[#c9d1d9] overflow-x-auto rounded-sm">
                      <pre><code>{section.code}</code></pre>
                    </div>
                  )}
                </motion.section>
              ))}
            </div>

            {/* Conclusion */}
            <motion.div variants={itemVariants} className="border border-border-primary bg-bg-secondary p-8 space-y-3">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono text-accent-orange">
                // Summary
              </h3>
              <p className="leading-relaxed text-text-secondary">
                {content.conclusion}
              </p>
            </motion.div>

            {/* Share Footer */}
            <motion.footer variants={itemVariants} className="flex flex-wrap items-center justify-between border-t border-border-primary pt-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border-primary bg-bg-secondary px-2.5 py-0.5 font-mono text-xs text-text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={handleCopyLink}
                className="mt-4 sm:mt-0 inline-flex items-center gap-2 border border-border-primary bg-bg-secondary px-5 py-2.5 text-xs font-semibold text-white transition-all hover:border-accent-orange"
              >
                <Share2 className="h-4 w-4" />
                Share Article
              </button>
            </motion.footer>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
