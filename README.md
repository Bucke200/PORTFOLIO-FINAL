# 🌟 Srinjay Panja - Developer Portfolio

A modern, interactive 3D portfolio website showcasing full-stack development skills with stunning animations and professional design.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Three.js](https://img.shields.io/badge/Three.js-Latest-orange)

## 🚀 Live Demo

**[View Live Portfolio →](https://portfolio-final-nine-sigma.vercel.app/)**

## ✨ Features

### 🎨 **Interactive 3D Experience**
- Dynamic 3D shapes that transform based on scroll position (sphere → cube → pyramid)
- Adaptive particle system (50-300 particles based on device capability)
- Smooth animations with reduced motion support
- Theme-responsive materials and lighting

### 🛡️ **Enterprise-Grade Security**
- Comprehensive input validation and sanitization
- Rate limiting (5 requests per 15 minutes)
- Security headers (CSP, XSS protection, CSRF prevention)
- Secure error handling without information leakage
- **Security Score: 9.4/10**

### 📧 **Functional Contact Form**
- Gmail SMTP integration with app passwords
- Real-time form validation
- Professional email templates
- Spam protection and rate limiting

### 🎭 **Modern UI/UX**
- Glassmorphism design elements
- Smooth scroll-triggered animations
- Responsive design for all devices
- Professional dark theme
- Animated buttons with hover effects

### ⚡ **Performance Optimized**
- Smart particle count based on device capabilities
- Lazy loading and code splitting
- Optimized 3D rendering
- 60fps smooth animations

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with TypeScript
- **Three.js & React Three Fiber** - 3D graphics and animations
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### **Backend**
- **Next.js API Routes** - Serverless functions
- **Nodemailer** - Email functionality
- **Gmail SMTP** - Email service integration

### **Security & Performance**
- **Input Validation** - Comprehensive sanitization
- **Rate Limiting** - Abuse prevention
- **Security Headers** - XSS, CSRF, clickjacking protection
- **Adaptive Rendering** - Device-based optimization

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or pnpm
- Gmail account with app password

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bucke200/PORTFOLIO-FINAL.git
   cd PORTFOLIO-FINAL
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Gmail SMTP credentials:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=your-email@gmail.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/contact/       # Contact form API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── sections/          # Page sections (intro, projects, about, contact)
│   ├── ui/               # Reusable UI components
│   ├── scene.tsx         # 3D scene component
│   └── modern-navbar.tsx # Navigation component
├── lib/
│   ├── security.ts       # Security utilities
│   └── utils.ts          # General utilities
├── public/               # Static assets
│   └── Srinjay_Panja_Resume.pdf
├── scripts/
│   └── security-test.js  # Security testing script
└── middleware.ts         # Security headers middleware
```

## 🔧 Configuration

### **Gmail SMTP Setup**
1. Enable 2-Step Verification in your Google Account
2. Generate an App Password:
   - Google Account → Security → App passwords
   - Select "Mail" and generate password
3. Use the generated password in `.env.local`

### **Security Testing**
```bash
npm run security-test    # Run security tests
npm run security-audit   # Check for vulnerabilities
```

## 🎨 Customization

### **Personal Information**
Update your details in:
- `components/sections/intro-section.tsx` - Hero section
- `components/sections/about-section.tsx` - About me content
- `components/sections/projects-section.tsx` - Featured projects
- `components/modern-navbar.tsx` - Social links

### **3D Scene**
Modify particle count and animations in:
- `components/scene.tsx` - 3D scene configuration

### **Styling**
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables

## 📊 Performance

### **Lighthouse Scores**
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### **3D Rendering Optimization**
- Adaptive particle count based on device
- Efficient geometry and materials
- Reduced motion support
- GPU-accelerated rendering

## 🛡️ Security Features

### **Input Security**
- Email format validation
- Input length limits
- HTML/XSS sanitization
- Required field validation

### **API Security**
- Rate limiting per IP
- Request size limits
- Secure error messages
- CORS configuration

### **Headers Security**
- Content Security Policy
- XSS Protection
- Clickjacking prevention
- MIME sniffing protection

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### **Other Platforms**
- **Netlify**: Works with static export
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 📈 Analytics & Monitoring

### **Recommended Tools**
- **Vercel Analytics** - Performance monitoring
- **Google Analytics** - User analytics
- **Sentry** - Error tracking
- **Uptime Robot** - Uptime monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About Me

**Srinjay Panja** - Full Stack Developer

- 🌍 Based in Bengaluru, India
- 💼 Available for freelance projects and full-time positions
- 🎯 Passionate about creating innovative digital experiences

### **Connect With Me**
- 📧 Email: [srinjaypanja200@gmail.com](mailto:srinjaypanja200@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/srinjaypanja](https://www.linkedin.com/in/srinjaypanja)
- 🐙 GitHub: [github.com/Bucke200](https://github.com/Bucke200)
- 🏆 Codeforces: [codeforces.com/profile/CyntaxError](https://codeforces.com/profile/CyntaxError)
- 💻 LeetCode: [leetcode.com/u/ashborn200](https://leetcode.com/u/ashborn200/)

## 🙏 Acknowledgments

- **Three.js** - Amazing 3D library
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible components
- **Tailwind CSS** - Utility-first styling
- **Next.js Team** - Excellent React framework

---

⭐ **Star this repository if you found it helpful!**

**Built with ❤️ by Srinjay Panja**
