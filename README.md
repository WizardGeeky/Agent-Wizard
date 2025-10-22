
# 🧙‍♂️ Agent Wizard

Agent Wizard is a Web3-based real-time trade monitoring and risk management tool that leverages AI-powered analytics to track market activity, assess risks, and deliver instant alerts via Telegram, helping users make smarter trading decisions.

## 🚀 Features
- 📈 **Real-Time Trade Monitoring** - Live tracking of trades and market movements.
- 🧠 **AI-Powered Risk Analysis** - Detects anomalies and volatility to mitigate risks.
- 📬 **Telegram Notifications** - Instant alerts for trades and risk events.
- 📊 **Advanced Analytics** - Interactive dashboards for deep insights.
- 🤖 **Agent-Powered Workflows** - Automates monitoring and decision-making.
- 👥 **Collaborative Insights** - Share insights and alerts with teams.

## 🧪 Demo
Check out the live demo: [Agent Wizard](https://agent-wizard.vercel.app)

## 📸 Proof Work
<img width="1725" height="801" alt="Screenshot 2025-10-21 215658" src="https://github.com/user-attachments/assets/c1ccd593-dfd7-4c22-8e25-389f80986d9a" />  <img width="1326" height="645" alt="Screenshot 2025-10-18 180420" src="https://github.com/user-attachments/assets/43cef318-9653-4051-9261-e7c1b87555f0" />  <img width="1905" height="911" alt="Screenshot 2025-10-21 215812" src="https://github.com/user-attachments/assets/486cee43-28e2-4e71-8b08-6538292228ad" />  <img width="1905" height="890" alt="Screenshot 2025-10-21 215832" src="https://github.com/user-attachments/assets/428d20c0-8cfe-4cc0-bde2-34efa37586f1" />  <img width="1915" height="891" alt="Screenshot 2025-10-21 215846" src="https://github.com/user-attachments/assets/a971d505-ba35-42b3-bcce-a4d7036ba860" />

### Mobile View

<img width="371" height="666" alt="Screenshot 2025-10-21 220703" src="https://github.com/user-attachments/assets/cb8a7bc3-07a9-422d-b7ba-3818d0b9f360" />  <img width="371" height="664" alt="Screenshot 2025-10-21 220714" src="https://github.com/user-attachments/assets/4bb03e57-9d24-4c89-83ce-895e04351b69" />


## 🌊 Application Flow
<img width="2001" height="1868" alt="untitled (1)" src="https://github.com/user-attachments/assets/cea42564-c812-4aa8-a70b-d073bbe31a29" />

## 🧩 Architecture Overview
```
Frontend (Next.js) ↔ Backend (Node.js API)
Backend ↔ MongoDB (Data storage)
Backend ↔ Ether.js (Web3 interactions)
Backend ↔ AI Agents (Risk analysis)
Backend ↔ Telegram/Email (Notifications)
```

## 🔐 Authentication
- Web3 login via MetaMask
- Traditional login via Magic.link
- Secure session management with JWT Token
- Data Encryption with AES

## 🧠 AI Agents
- **Trade Monitor Agent**: Monitoring Trade information of Web3 coins based on users Risk configuration
- **Telegram Agent**: Sends real-time alerts
- **Email Agent**: Sends risk summaries
- **Chat Agent**: You can ask anything about web 3.0

## 🧪 Testing
```bash
npm run test
```
Tools: Jest, Cypress

## 🧰 Local Development
```bash
git clone https://github.com/WizardGeeky/Agent-Wizard.git
cd Agent-Wizard
npm install
npm run dev
```

## 🌐 Environment Variables
```env
MONGODB_URI = YOUR_MONGODB_URI
CIPHER_SECRET = YOUR_OWN_CIPHER_KEY
NEXT_PUBLIC_JWT_SECRET = YOUR_JWT_KEY
NEXT_PUBLIC_PERSONAL_EMAIL = YOUR_EMAIL_ADDRESS
NEXT_PUBLIC_BURNER_PASSWORD = YOUR_EMAIL_APP_PASSWORD
TELEGRAM_BOT_TOKEN = YOUR_TELEGRAM_BOT_TOKEN
GOOGLE_API_KEY = YOUR_GEMINIAI_KEY
GOOGLE_SEARCH_KEY= YOUR_GOOGLE_SEARCH_APIKEY
GOOGLE_CSE_ID = YOUR_GOOGLE_CSE_APIKEY
NEXT_PUBLIC_APP_URL = YOUR_APPLICATION_URL
```

## 🧠 AI & ML Models
- Uses ADK-TS and IQAI for anomaly detection and risk scoring
- Real-time analysis of trade patterns

## 📡 Web3 Integration
- Ether.js for smart contract interaction
- Wallet connection via MetaMask
- Real-time blockchain event tracking

## 🧾 API Reference

<table width="100%" border="0.5" cellspacing="0" cellpadding="6">
  <thead>
    <tr>
      <th><strong>API Path</strong></th>
      <th><strong>HTTP Method</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/api/v1/signup</td>
      <td>POST</td>
      <td>User Account creation with email and password</td>
    </tr>
    <tr>
      <td>/api/v1/chat</td>
      <td>POST</td>
      <td>Chat bot (ask anything about web3, trade market)</td>
    </tr>
    <tr>
      <td>/api/v1/login</td>
      <td>POST</td>
      <td>Authenticate user via email and password</td>
    </tr>
    <tr>
      <td>/api/v1/login/metamask</td>
      <td>POST</td>
      <td>Authenticate user via Metamask Wallect</td>
    </tr>
    <tr>
      <td>/api/v1/otp</td>
      <td>POST</td>
      <td>Send Otp to User email</td>
    </tr>
    <tr>
      <td>/api/v1/password</td>
      <td>POST</td>
      <td>Send Password Reset link to email</td>
    </tr>
    <tr>
      <td>/api/v1/password/reset</td>
      <td>POST</td>
      <td>Reset the password</td>
    </tr>
    <tr>
      <td>/api/v1/password</td>
      <td>POST</td>
      <td>Verify Otp</td>
    </tr>
    <tr>
      <td>/api/v1/monitor</td>
      <td>POST</td>
      <td>Select web3 coins to wish list to monitor</td>
    </tr>
    <tr>
      <td>/api/v1/monitor</td>
      <td>GET</td>
      <td>Get all wish list coins</td>
    </tr>
    <tr>
      <td>/api/v1/analysis</td>
      <td>POST</td>
      <td>Get All information or analytics about wish list coins</td>
    </tr>
    <tr>
      <td>/api/v1/risk</td>
      <td>POST</td>
      <td>Create Risk configuration for wish list coins on markey cap, volume in %</td>
    </tr>
    <tr>
      <td>/api/v1/risk</td>
      <td>GET</td>
      <td>Get All Risk Configuration</td>
    </tr>
    <tr>
      <td>/api/v1/risk</td>
      <td>DELETE</td>
      <td>Delete Risk Configuration</td>
    </tr>
  </tbody>
</table>


## 🧑‍💻 Contributing
- Fork the repo
- Create a feature branch
- Submit a pull request

## 🙋 FAQ
**Q:** How do I connect my wallet?
**A:** Use MetaMask extension and connect via the dashboard.

**Q:** What chains are supported?
**A:** Ethereum mainnet and testnets.

**Q:** How is risk calculated?
**A:** Using AI models that analyze trade volume, volatility, and historical patterns.

## 📦 Tech Stack
- **Frontend**: TypeScript, NextJS, ShadCN, MagicUI, Tailwind CSS
- **Backend**: Node JS, NextJS, Nodemailer
- **Database**: MongoDB
- **Web3**: EtherJS
- **Wallet**: MetaMask
- **Notifications**: Telegram, Email
- **AIML**: ADK-TS, IQAI
- **AI Agents**: Telegram Agent, Email Agent, Chat Agent
- **3rd Party APIs**: Coingecko, Alchemy

## 📁 Folder Structure

```
├── 📁 app
│   ├── 📁 adk
│   │   ├── 📁 agent
│   │   │   ├── 📄 agent.ts
│   │   │   └── 📄 chatAgent.ts
│   │   └── 📁 tools
│   │       ├── 📄 RealGoogleSearch.ts
│   │       └── 📄 telegramTool.ts
│   ├── 📁 api
│   │   └── 📁 v1
│   │       ├── 📁 assets
│   │       │   ├── 📁 analytics
│   │       │   │   └── 📄 route.ts
│   │       │   ├── 📁 monitor
│   │       │   │   └── 📄 route.ts
│   │       │   └── 📁 risk
│   │       │       └── 📄 route.ts
│   │       ├── 📁 chat
│   │       │   └── 📄 route.ts
│   │       ├── 📁 login
│   │       │   ├── 📁 metamask
│   │       │   │   └── 📄 route.ts
│   │       │   └── 📄 route.ts
│   │       ├── 📁 otp
│   │       │   ├── 📁 verify
│   │       │   │   └── 📄 route.ts
│   │       │   └── 📄 route.ts
│   │       ├── 📁 password
│   │       │   ├── 📁 reset
│   │       │   │   └── 📄 route.ts
│   │       │   └── 📄 route.ts
│   │       └── 📁 signup
│   │           └── 📄 route.ts
│   ├── 📁 components
│   │   ├── 📄 Agent.tsx
│   │   ├── 📄 Features.tsx
│   │   ├── 📄 Hero.tsx
│   │   ├── 📄 HowItWorks.tsx
│   │   ├── 📄 LoginForm.tsx
│   │   ├── 📄 Metamask.tsx
│   │   ├── 📄 Nav.tsx
│   │   └── 📄 SignUpForm.tsx
│   ├── 📁 config
│   │   ├── 📄 cipher.config.ts
│   │   ├── 📄 database.config.ts
│   │   ├── 📄 jwt.config.ts
│   │   └── 📄 nodemailer.config.ts
│   ├── 📁 contexts
│   │   └── 📄 ThemeContext.tsx
│   ├── 📁 dashboard
│   │   ├── 📁 components
│   │   │   ├── 📄 Analytics.tsx
│   │   │   ├── 📄 CoinTable.tsx
│   │   │   ├── 📄 dashboard.tsx
│   │   │   ├── 📄 logout.tsx
│   │   │   ├── 📄 profile.tsx
│   │   │   └── 📄 riskanalysisengine.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 lib
│   │   └── 📄 cron.ts
│   ├── 📁 models
│   │   ├── 📄 AssetMonitor.ts
│   │   ├── 📄 Otp.ts
│   │   ├── 📄 RiskConfig.ts
│   │   └── 📄 User.ts
│   ├── 📁 password
│   │   ├── 📁 reset
│   │   │   └── 📄 page.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 types
│   │   ├── 📄 CoinEvent .ts
│   │   └── 📄 CoinInfo.ts
│   ├── 📁 utils
│   │   └── 📁 templates
│   │       ├── 📄 cryptoNotification.tsx
│   │       ├── 📄 otpTemplate.tsx
│   │       └── 📄 welcomeTemplate.tsx
│   ├── 📄 favicon.ico
│   ├── 🎨 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 components
│   └── 📁 ui
│       ├── 📄 animated-theme-toggler.tsx
│       ├── 📄 aurora-text.tsx
│       ├── 📄 button.tsx
│       ├── 📄 card.tsx
│       ├── 📄 chart.tsx
│       ├── 📄 checkbox.tsx
│       ├── 📄 dialog.tsx
│       ├── 📄 floating-dock.tsx
│       ├── 📄 input.tsx
│       ├── 📄 label.tsx
│       ├── 📄 loader.tsx
│       ├── 📄 radio-group.tsx
│       ├── 📄 ripple.tsx
│       ├── 📄 select.tsx
│       ├── 📄 switch.tsx
│       ├── 📄 tabs.tsx
│       ├── 📄 tooltip.tsx
│       └── 📄 wobble-card.tsx
├── 📁 lib
│   └── 📄 utils.ts
├── 📁 public
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ components.json
├── 📄 next.config.ts
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.mjs
└── ⚙️ tsconfig.json
```

## 📄 License
This project is licensed under the MIT License.






