import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart,
  SlidersHorizontal,
  X
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Slider } from '../components/ui/slider'
import { Checkbox } from '../components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { toast } from 'sonner'

// Mock search results
const searchResults = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones Pro',
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    badge: '33% OFF',
    category: 'Electronics',
    brand: 'TechPro',
    inStock: true
  },
  {
    id: 2,
    name: 'Premium Cotton T-Shirt Collection',
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    badge: '40% OFF',
    category: 'Fashion',
    brand: 'StyleCo',
    inStock: true
  },
  {
    id: 3,
    name: 'Smart Fitness Watch Series 5',
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    badge: '29% OFF',
    category: 'Electronics',
    brand: 'FitTech',
    inStock: false
  },
  {
    id: 4,
    name: 'Organic Skincare Complete Set',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 634,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    badge: '31% OFF',
    category: 'Beauty',
    brand: 'NaturalGlow',
    inStock: true
  },
  {
    id: 5,
    name: 'Professional Camera Lens 85mm',
    price: 599.99,
    originalPrice: 799.99,
    rating: 4.9,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
    badge: '25% OFF',
    category: 'Electronics',
    brand: 'PhotoPro',
    inStock: true
  },
  {
    id: 6,
    name: 'Luxury Leather Handbag Designer',
    price: 159.99,
    originalPrice: 229.99,
    rating: 4.8,
    reviews: 789,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    badge: '30% OFF',
    category: 'Fashion',
    brand: 'LuxeBags',
    inStock: true
  }
]

const categories = ['All', 'Electronics', 'Fashion', 'Beauty', 'Sports', 'Home']
const brands = ['All', 'TechPro', 'StyleCo', 'FitTech', 'NaturalGlow', 'PhotoPro', 'LuxeBags']

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All'])
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['All'])
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [filteredResults, setFilteredResults] = useState(searchResults)

  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, items: wishlistItems } = useWishlist()

  // Filter and sort results
  useEffect(() => {
    const filtered = [...searchResults].filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      const matchesCategory = selectedCategories.includes('All') || 
        selectedCategories.includes(product.category)
      
      const matchesBrand = selectedBrands.includes('All') || 
        selectedBrands.includes(product.brand)
      
      const matchesStock = !showInStockOnly || product.inStock

      return matchesSearch && matchesPrice && matchesCategory && matchesBrand && matchesStock
    })

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // Keep original order for newest
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredResults(filtered)
  }, [searchQuery, sortBy, priceRange, selectedCategories, selectedBrands, showInStockOnly])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams({ q: searchQuery })
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    toast.success(`${product.name} added to cart!`)
  }

  const handleToggleWishlist = (product: any) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id)
    if (isInWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      })
      toast.success('Added to wishlist!')
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories(['All'])
    setSelectedBrands(['All'])
    setShowInStockOnly(false)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (category === 'All') {
                    setSelectedCategories(checked ? ['All'] : [])
                  } else {
                    if (checked) {
                      setSelectedCategories(prev => 
                        prev.includes('All') ? [category] : [...prev.filter(c => c !== 'All'), category]
                      )
                    } else {
                      setSelectedCategories(prev => prev.filter(c => c !== category))
                    }
                  }
                }}
              />
              <label htmlFor={`category-${category}`} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (brand === 'All') {
                    setSelectedBrands(checked ? ['All'] : [])
                  } else {
                    if (checked) {
                      setSelectedBrands(prev => 
                        prev.includes('All') ? [brand] : [...prev.filter(b => b !== 'All'), brand]
                      )
                    } else {
                      setSelectedBrands(prev => prev.filter(b => b !== brand))
                    }
                  }
                }}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showInStockOnly}
            onCheckedChange={setShowInStockOnly}
          />
          <label htmlFor="in-stock" className="text-sm">
            In Stock Only
          </label>
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b px-4 py-3">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Desktop Search Header */}
        <div className="hidden md:block mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search for products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20 py-3 text-lg"
              />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
            </h1>
            <p className="text-muted-foreground">
              {filteredResults.length} products found
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="hidden md:flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List size={16} />
              </Button>
            </div>

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <SlidersHorizontal size={16} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X size={16} />
                </Button>
              </div>
              <FilterContent />
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredResults.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={viewMode === 'list' ? 'flex' : ''}
                  >
                    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      viewMode === 'list' ? 'flex-row w-full' : ''
                    }`}>
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                      }`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                          {product.badge}
                        </Badge>
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="secondary">Out of Stock</Badge>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                          onClick={() => handleToggleWishlist(product)}
                        >
                          <Heart 
                            size={18} 
                            className={wishlistItems.some(item => item.id === product.id) ? 'fill-red-500 text-red-500' : ''} 
                          />
                        </Button>
                      </div>
                      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs mr-2">
                            {product.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.brand}
                          </Badge>
                        </div>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-lg font-bold text-primary">${product.price}</span>
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ${product.originalPrice}
                            </span>
                          </div>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart size={16} className="mr-2" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}