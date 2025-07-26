import { useState } from 'react'
import { Search, ShoppingCart, User, Heart, Menu, Phone, Mail, MapPin, Star, ChevronDown } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'
import { Card, CardContent } from './components/ui/card'

function App() {
  const [cartCount, setCartCount] = useState(0)

  const addToCart = () => {
    setCartCount(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Bar */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>info@pressmart.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Store Location</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow Us:</span>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">f</div>
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs">t</div>
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs">i</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">PressMart</h1>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Home</a>
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-primary font-medium flex items-center">
                  Shop <ChevronDown className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-primary font-medium flex items-center">
                  Pages <ChevronDown className="w-4 h-4 ml-1" />
                </a>
              </div>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Blog</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Elements</a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium">Buy</a>
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2">
                <Input 
                  placeholder="Search products..." 
                  className="border-0 bg-transparent focus:ring-0 w-64"
                />
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-accent text-white mb-4">Season Sale</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Up to 70% Off
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Discover amazing deals on fashion, electronics, and more
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Shop Now
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
                alt="Fashion Sale" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Discover our wide range of products</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Women's Fashion */}
            <Card className="overflow-hidden group cursor-pointer">
              <CardContent className="p-0 relative">
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop" 
                  alt="Women's Fashion" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Women's Fashion</h3>
                    <p className="mb-4">Trendy styles for every occasion</p>
                    <Button variant="secondary">Shop Women</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Men's Fashion */}
            <Card className="overflow-hidden group cursor-pointer">
              <CardContent className="p-0 relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop" 
                  alt="Men's Fashion" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Men's Fashion</h3>
                    <p className="mb-4">Classic and modern styles</p>
                    <Button variant="secondary">Shop Men</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Our best-selling items</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Product 1 */}
            <Card className="group cursor-pointer">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop" 
                    alt="Product 1" 
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-accent">-30%</Badge>
                </div>
                <h3 className="font-semibold mb-2">Casual T-Shirt</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(24)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">$29.99</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$42.99</span>
                  </div>
                  <Button size="sm" onClick={addToCart}>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 */}
            <Card className="group cursor-pointer">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop" 
                    alt="Product 2" 
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-accent">-25%</Badge>
                </div>
                <h3 className="font-semibold mb-2">Denim Jacket</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(18)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">$79.99</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$106.99</span>
                  </div>
                  <Button size="sm" onClick={addToCart}>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 3 */}
            <Card className="group cursor-pointer">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop" 
                    alt="Product 3" 
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-accent">-40%</Badge>
                </div>
                <h3 className="font-semibold mb-2">Summer Dress</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(32)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">$59.99</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$99.99</span>
                  </div>
                  <Button size="sm" onClick={addToCart}>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 4 */}
            <Card className="group cursor-pointer">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop" 
                    alt="Product 4" 
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-accent">-20%</Badge>
                </div>
                <h3 className="font-semibold mb-2">Sneakers</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(15)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">$89.99</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$112.99</span>
                  </div>
                  <Button size="sm" onClick={addToCart}>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weekend Sale Banner */}
      <section className="py-16 bg-gradient-to-r from-accent to-accent/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Weekend Sale</h2>
          <p className="text-xl text-white/90 mb-6">Get up to 50% off on selected items</p>
          <Button size="lg" variant="secondary">
            Shop Weekend Sale
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PressMart</h3>
              <p className="text-gray-400 mb-4">Your one-stop shop for fashion and lifestyle products.</p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">f</div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">t</div>
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">i</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Shipping</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Women's Fashion</a></li>
                <li><a href="#" className="hover:text-white">Men's Fashion</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">Sale Items</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new products and offers.</p>
              <div className="flex">
                <Input placeholder="Your email" className="bg-gray-800 border-gray-700" />
                <Button className="ml-2">Subscribe</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PressMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App