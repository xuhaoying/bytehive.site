export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">AI Nav</h3>
            <p className="text-muted-foreground">
              A curated directory of AI tools to help you find the right solution for your needs.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Submit a Tool
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with the latest AI tools and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 py-2 px-3 rounded-l-md bg-secondary/50 border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                className="bg-primary text-primary-foreground py-2 px-4 rounded-r-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Nav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}