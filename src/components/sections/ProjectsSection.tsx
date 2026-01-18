import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { projectApi } from "@/api/projectApi";
import { languageColors } from "@/lib/languageColors";



export const ProjectsSection = () => {
  const [projects, setProjects] = useState<{
    _id: string;
    title: string;
    description: string;
    tags: string[];
    languages: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    status: 'draft' | 'published';
    thumbnail?: string;
    screenshots?: string[];
    createdAt: string;
    updatedAt: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getProjects({ limit: 3 });
        setProjects(response.projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  if (loading) {
    return (
      <section id="projects" className="py-20 md:py-32 relative bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-medium text-secondary bg-secondary/10 rounded-full mb-4">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground/70">Recent</span> <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Loading projects...
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 md:py-32 relative bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-medium text-secondary bg-secondary/10 rounded-full mb-4">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground/70">Recent</span> <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No recent projects found
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="projects" className="py-20 md:py-32 relative bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-sm font-medium text-secondary bg-secondary/10 rounded-full mb-4">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground/70">Recent</span> <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work. Each project represents a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-xl overflow-hidden glass hover-lift"
            >
              {/* Featured Badge - Top Left */}
                {project.featured && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-yellow-500 bg-yellow-800/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                )}
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail || `https://images.unsplash.com/photo-${index + 1}?w=800&h=600&fit=crop`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                  {project.liveUrl && (
                    <Button size="sm" variant="secondary" className="gap-1" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" className="gap-1" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 text-foreground/70" />
                        <span className="text-foreground/70">Code</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">

                <h3 className="text-xl font-semibold mb-2 text-foreground/70 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={`tag-${tag}`}
                      className="px-2 py-1 text-xs font-mono bg-muted/50  text-foreground/50 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Languages - Moved to bottom */}
                {project.languages && project.languages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                    {project.languages.slice(0, 3).map((lang: string) => (
                      <div key={`lang-${lang}`} className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${languageColors[lang] || "bg-muted"}`} />
                        <span className="text-xs font-mono text-muted-foreground">
                          {lang}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    0
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    0
                  </span>
                </div>
                    
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/projects">
              <Code className="w-5 h-5 mr-2 text-foreground/70" />
              <span className="text-foreground/70">View All Projects</span>
              <motion.span
                className="ml-2 text-foreground/70"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
