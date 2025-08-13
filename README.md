# 🌟 Srinjay Panja - Developer Portfolio

A modern, interactive 3D portfolio website showcasing full-stack development skills with stunning animations and professional design.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Three.js](https://img.shields.io/badge/Three.js-Latest-orange)

## 🚀 Live Demo

**[View Live Portfolio →](https://portfolio-final-nine-sigma.vercel.app/)**

## ✨ Features

### 🎨 **Interactive 3D Experience**
- Dynamic 3D shapes that transform based on scroll position
- Adaptive particle system (50-300 particles based on device capability)
- Smooth animations with reduced motion support
- Professional dark theme with glassmorphism effects

### 🛡️ **Security First**
- Comprehensive input validation and sanitization
- Rate limiting (5 requests per 15 minutes)
- Security headers (CSP, XSS protection, clickjacking prevention)
- **Security Score: 9.4/10**

### 📱 **Modern UI/UX**
- Responsive design for all devices
- Smooth scroll-triggered animations
- Modern animated buttons with hover effects
- Functional contact form with Gmail SMTP

## �️ Tecph Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Three.js & React Three Fiber** - 3D graphics
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Gmail account with app password

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bucke200/PORTFOLIO-FINAL.git
   cd PORTFOLIO-FINAL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Gmail SMTP credentials in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## � Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/contact/       # Contact form API
│   └── page.tsx           # Main page
├── components/
│   ├── sections/          # Page sections
│   ├── ui/               # Reusable components
│   └── scene.tsx         # 3D scene
├── lib/                  # Utilities
├── public/               # Static assets
└── middleware.ts         # Security middleware
```

## 🔧 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run security-test    # Run security tests
npm run security-audit   # Check vulnerabilities
```

## 🛡️ Security Features

- Input validation and sanitization
- Rate limiting protection
- Security headers (CSP, XSS protection)
- Secure error handling
- CORS configuration

## 📊 Performance

### Adaptive Particle System
- **Desktop**: 300 particles
- **Mobile**: 150 particles
- **Reduced Motion**: 50 particles

### Optimizations
- Code splitting and lazy loading
- Optimized 3D rendering
- Responsive design
- 60fps animations

## � Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables
3. Deploy automatically

## 👨‍💻 About

**Srinjay Panja** - Full Stack Developer

- 💼 LinkedIn: [linkedin.com/in/srinjaypanja](https://www.linkedin.com/in/srinjaypanja)
- 🐙 GitHub: [github.com/Bucke200](https://github.com/Bucke200)
- 📧 Email: srinjaypanja200@gmail.com

### Skills Showcased
- Full-stack development (MERN, Spring, Django)
- 3D graphics and animations
- Security best practices
- Performance optimization
- Modern React patterns

## 📄 License

MIT License - see LICENSE file for details.

---

⭐ **Star this repository if you found it helpful!**

**Built with ❤️ by Srinjay Panja**
