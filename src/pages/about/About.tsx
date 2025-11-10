import { Code, Heart, Rocket, Wrench, Target, BookOpen, Sparkles } from "lucide-react"
import { useNavigate } from "react-router"

export default function About() {
  const navigate = useNavigate()

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 lg:py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="mb-2">About Recipe World</h1>
                <p className="text-muted-foreground">The story behind the project and the developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2>Hello, I'm Bünyamin Kara</h2>
              </div>
              <p className="text-foreground/90 text-lg leading-relaxed">
                Also known as <strong className="text-primary">AbuTokio</strong> in the developer community. Recipe
                World is more than just a project - it's a milestone in my journey from automotive professional to
                software developer, representing my passion for coding and my commitment to turning that passion into a
                career.
              </p>
            </div>

            {/* The Journey */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-5 h-5 text-primary" />
                <h2>The Journey</h2>
              </div>

              <div className="space-y-6">
                {/* Timeline item 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="mb-2">Where It All Began</h4>
                    <p className="text-foreground/90">
                      My love affair with coding started when I was just 14 years old. From that young age, I was
                      captivated by the power of code - the ability to create something from nothing, to solve problems,
                      and to bring ideas to life. I dove into programming headfirst, teaching myself through online
                      resources, tutorials, and countless hours of experimentation. While I was passionate and
                      dedicated, my journey was entirely self-taught and never formalized into professional training.
                    </p>
                  </div>
                </div>

                {/* Timeline item 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="mb-2">Career in Automotive</h4>
                    <p className="text-foreground/90 mb-3">
                      Despite my passion for programming, life took me down a different path. I built a successful
                      career in the automotive industry, working in various roles that taught me invaluable lessons
                      about systems, processes, and continuous improvement:
                    </p>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>
                          <strong>Mechanic:</strong> Where I learned the fundamentals of how complex systems work
                          together
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>
                          <strong>System Operator:</strong> Managing and optimizing automated systems
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>
                          <strong>Process Engineering Supporter:</strong> Analyzing and improving manufacturing
                          processes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>
                          <strong>Process Development & KAIZEN Specialist:</strong> Leading continuous improvement
                          initiatives and developing efficient workflows
                        </span>
                      </li>
                    </ul>
                    <p className="text-foreground/90 mt-3">
                      Each role strengthened my problem-solving skills, attention to detail, and understanding of how to
                      optimize complex systems - skills that translate perfectly into software development.
                    </p>
                  </div>
                </div>

                {/* Timeline item 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="mb-2">The Turning Point</h4>
                    <p className="text-foreground/90">
                      In early 2025, I made a life-changing decision. I realized that while I had built a solid career
                      in automotive, my true passion had always been coding. The voice in the back of my mind - the one
                      that whispered about creating software, building applications, and solving problems through code -
                      had never gone away. It was time to stop wondering "what if" and start taking action.
                    </p>
                    <p className="text-foreground/90 mt-3">
                      I made the bold choice to leave the security of my established career and pursue my dream. I
                      enrolled in a professional coding bootcamp to transform my self-taught skills into a professional
                      foundation and launch my new career as a software developer.
                    </p>
                  </div>
                </div>

                {/* Timeline item 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="mb-2">Recipe World: A Bootcamp Project</h4>
                    <p className="text-foreground/90">
                      Recipe World was born during the backend module of my bootcamp journey. This project was assigned
                      as one of our core tasks, challenging us to build a full-stack application with real-world
                      functionality. What started as an educational assignment evolved into something I'm truly proud of
                      - a fully functional recipe sharing platform that demonstrates my growing skills in modern web
                      development.
                    </p>
                    <p className="text-foreground/90 mt-3">
                      Building Recipe World taught me about database design, authentication, CRUD operations, RESTful
                      APIs, user experience design, and so much more. Every feature represents a lesson learned, a
                      problem solved, and a step forward in my development journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Stack */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-5 h-5 text-primary" />
                <h2>Technical Implementation</h2>
              </div>
              <p className="text-foreground/90 mb-4">
                Recipe World is built with modern web technologies and best practices:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-accent/10 rounded-lg p-4">
                  <h4 className="mb-2">Frontend</h4>
                  <ul className="space-y-1 text-foreground/90 text-sm">
                    <li>• React with TypeScript</li>
                    <li>• Tailwind CSS v4</li>
                    <li>• Custom component library</li>
                    <li>• Responsive design</li>
                    <li>• Light/Dark mode support</li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <h4 className="mb-2">Backend</h4>
                  <ul className="space-y-1 text-foreground/90 text-sm">
                    <li>• Supabase (PostgreSQL)</li>
                    <li>• Row-level security policies</li>
                    <li>• RESTful API design</li>
                    <li>• Authentication & authorization</li>
                    <li>• File storage with CDN</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                The platform features user authentication, recipe management (CRUD operations), image uploads, social
                features (followers, favorites), category browsing, and a comprehensive search system. All hosted on EU
                servers (Sweden) with GDPR compliance.
              </p>
            </div>

            {/* Philosophy */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-5 h-5 text-primary" />
                <h2>My Philosophy</h2>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-xl p-6">
                <p className="text-foreground/90 leading-relaxed mb-4">
                  I believe that it's never too late to pursue your passion. My journey from automotive to software
                  development proves that with dedication, courage, and the willingness to learn, you can transform your
                  life and career.
                </p>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  My background in automotive process engineering and KAIZEN (continuous improvement) shapes how I
                  approach software development. I see code as a system to be optimized, bugs as opportunities for
                  improvement, and every project as a chance to learn and grow.
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  Recipe World represents not just technical skills, but also the culmination of years of
                  problem-solving experience, attention to detail, and a passion for creating things that work
                  beautifully and efficiently.
                </p>
              </div>
            </div>

            {/* Looking Forward */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-5 h-5 text-primary" />
                <h2>Looking Forward</h2>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                This is just the beginning of my software development career. Recipe World is my first major project in
                my professional journey, but it won't be my last. I'm excited to continue learning, building, and
                growing as a developer. Each line of code I write brings me closer to my goal of becoming a skilled
                professional who can create meaningful, impactful software.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Thank you for taking the time to learn about my journey. If you'd like to connect, discuss this project,
                or explore opportunities to work together, I'd love to hear from you.
              </p>
            </div>

            {/* Contact/Connect */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="mb-4">Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to feedback, collaboration, and new opportunities.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/bunyaminkara/"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                  Get in Touch
                </a>
                <button
                  onClick={() => navigate("/recipes")}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                  Explore Recipes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
