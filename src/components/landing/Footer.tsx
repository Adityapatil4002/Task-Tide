
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto bg-secondary/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-left">
            <div className="flex items-center mb-4">
              <div className="mr-2 text-accent">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-6 w-6"
                >
                  <path d="M12 2 L22 8.5 L22 15.5 L12 22 L2 15.5 L2 8.5 L12 2" />
                  <path d="M12 22 L12 15.5" />
                  <path d="M22 8.5 L12 15.5 L2 8.5" />
                  <path d="M2 15.5 L12 8.5 L22 15.5" />
                  <path d="M12 2 L12 8.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TaskTide</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Streamline your workflow, boost productivity, and stay organized with our
              comprehensive task management solution.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link></li>
              <li><Link to="/todos" className="text-muted-foreground hover:text-foreground transition-colors">To-Do List</Link></li>
              <li><Link to="/statistics" className="text-muted-foreground hover:text-foreground transition-colors">Statistics</Link></li>
              <li><Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">Settings</Link></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex items-center mb-2 text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href="mailto:support@tasktide.com" className="text-muted-foreground hover:text-foreground transition-colors">support@tasktide.com</a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              © 2025 TaskTide. All rights reserved.<br />
              Designed with care for enhanced productivity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
