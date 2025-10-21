
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
Check out the live demo: [Agent Wizard](https://agent-wizard.vercelapp)

## 📸 Screenshots
_Add screenshots of the dashboard, alerts, and agent interactions here._

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
git clone https://github.com/your-org/agent-wizard.git
cd agent-wizard
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
```http
GET /api/trades
POST /api/alerts
GET /api/analytics
```

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

## 📄 License
This project is licensed under the MIT License.
