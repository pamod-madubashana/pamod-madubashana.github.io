import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/lib/apiConfig';
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Star, GitFork, ExternalLink, Github, Filter, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { languageColors } from "@/lib/languageColors";

const languages = [
  "All",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Express",
  "MongoDB",
  "MySQL",
  "Docker",
  "AWS",
  "PostgreSQL",
  "Java",
  "Go",
  "Dart",
  "PHP"
];

interface Project {
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
}

const Projects = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { settings, loading: settingsLoading } = useSettings();
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();
        
        if (response.ok) {
          setProjects(data.projects || []);
        } else {
          setError(data.error || 'Failed to fetch projects');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesLanguage = selectedLanguage === "All" || project.tags.includes(selectedLanguage);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLanguage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1 text-sm font-medium text-secondary bg-secondary/10 rounded-full mb-6">
                My Work
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground/70">Featured </span><span className="text-gradient">Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A collection of projects I've built over the years. From full-stack applications 
                to open-source tools, each represents a unique challenge and learning experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl glass"
            >
              {/* Search */}
              <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              {/* Language Filter */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                      selectedLanguage === lang
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLanguage + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-xl overflow-hidden glass hover-lift"
                  >
                    {/* Content - using a placeholder image for now */}
                    
                    <div className="relative aspect-video overflow-hidden bg-muted/20 flex items-center justify-center">
                      <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.thumbnail || `https://images.unsplash.com/photo-${index + 1}?w=800&h=600&fit=crop`}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      </div>
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
                      <div className="flex items-center gap-2 mb-3">
                        {project.languages && project.languages.length > 0 && (
                          <div className="flex flex-wrap gap-3 mt-2">
                            {project.languages.slice(0, 3).map((lang: string) => (
                              <div key={`lang-${lang}`} className="flex items-center gap-1">
                              <span className={`w-3 h-3 rounded-full ${languageColors[lang] || "bg-muted"}`} />
                                <span className="text-xs font-mono text-muted-foreground">
                                  {lang || "Technology"}
                                </span>
                              </div>
                              
                            ))}
                          </div>
                        )}
                      </div>

                      
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
                      
                      

                      {/* Stats */}
                      {project.featured && (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4" />
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
            {(loading || error || (filteredProjects.length === 0 && projects.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-3 text-center py-20"
                  >
                    <div className="flex justify-center">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                    <p className="text-muted-foreground mt-4">Loading projects...</p>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-3 text-center py-20"
                  >
                    <p className="text-destructive">Error: {error}</p>
                  </motion.div>
                ) : filteredProjects.length === 0 && projects.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-3 text-center py-20"
                  >
                    <p className="text-muted-foreground">No projects found matching your criteria.</p>
                  </motion.div>
                ) : null}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
