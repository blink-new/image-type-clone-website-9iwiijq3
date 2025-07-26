import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { state: cartState } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Women', href: '/shop/women', subcategories: ['Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories'] },
    { name: 'Men', href: '/shop/men', subcategories: ['Shirts', 'Pants', 'Jackets', 'Shoes', 'Accessories'] },
    { name: 'Kids', href: '/shop/kids', subcategories: ['Boys', 'Girls', 'Baby', 'Shoes', 'Toys'] },
    { name: 'Electronics', href: '/shop/electronics', subcategories: ['Phones', 'Laptops', 'Tablets', 'Audio', 'Gaming'] },
    { name: 'Home', href: '/shop/home', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Storage'] },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@pressmart.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>New York, NY 10001</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow us:</span>
              <div className="flex space-x-2">
                <Facebook className="w-4 h-4 hover:text-accent cursor-pointer transition-colors" />
                <Twitter className="w-4 h-4 hover:text-accent cursor-pointer transition-colors" />
                <Instagram className="w-4 h-4 hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.div 
        className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
        animate={{ paddingTop: isScrolled ? '0.5rem' : '1rem', paddingBottom: isScrolled ? '0.5rem' : '1rem' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white p-2 rounded-lg"
              >
                <Star className="w-6 h-6" />
              </motion.div>
              <span className="text-2xl font-bold text-primary">PressMart</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-primary transition-colors">
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Mega Menu */}
                <div className="absolute top-full left-0 w-screen max-w-4xl bg-white shadow-xl border-t-2 border-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-8">
                    <div className="grid grid-cols-5 gap-8">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <Link 
                            to={category.href}
                            className="font-semibold text-primary hover:text-accent transition-colors block mb-3"
                          >
                            {category.name}
                          </Link>
                          <ul className="space-y-2">
                            {category.subcategories.map((sub) => (
                              <li key={sub}>
                                <Link 
                                  to={`${category.href}/${sub.toLowerCase()}`}
                                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link 
                to="/shop" 
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === '/shop' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === '/about' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                About
              </Link>
              <Link 
                to="/blog" 
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === '/blog' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === '/contact' ? 'text-primary' : 'text-gray-700'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <AnimatePresence>
                  {isSearchOpen ? (
                    <motion.form
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      onSubmit={handleSearch}
                      className="flex items-center"
                    >
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                        autoFocus
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.form>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      <Search className="w-5 h-5" />
                    </Button>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <Link to="/wishlist">
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="w-5 h-5" />
                </Button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartState.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {cartState.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Account */}
              <Link to="/account">
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                <Link 
                  to="/" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/shop" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                {categories.map((category) => (
                  <Link 
                    key={category.name}
                    to={category.href} 
                    className="block py-2 text-gray-700 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link 
                  to="/about" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/blog" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/contact" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;