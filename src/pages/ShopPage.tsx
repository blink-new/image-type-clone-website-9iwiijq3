import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye,
  X,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/hooks/useCart';

const ShopPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  const productsPerPage = 12;



  const brands = ['Nike', 'Sony', 'Zara', 'Apple', 'Coach', 'IKEA', 'Adidas', 'Williams Sonoma', 'Logitech', 'Levi\'s', 'OtterBox', 'Manduka'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Gray', 'Brown', 'Gold', 'Silver', 'Purple', 'Tan', 'Light Blue', 'Clear'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '7', '8', '9', '10', '11', '38mm', '42mm'];

  useEffect(() => {
    // Mock products data - in real app, this would come from API
    const products = [
      {
        id: '1',
        name: 'Premium Cotton T-Shirt',
        price: 29.99,
        originalPrice: 39.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        rating: 4.8,
        reviews: 124,
        discount: 25,
        category: 'fashion',
        subcategory: 'tops',
        brand: 'Nike',
        colors: ['Black', 'White', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        badge: 'Best Seller',
        description: 'Comfortable premium cotton t-shirt perfect for everyday wear.'
      },
      {
        id: '2',
        name: 'Wireless Bluetooth Headphones',
        price: 89.99,
        originalPrice: 129.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        rating: 4.9,
        reviews: 89,
        discount: 31,
        category: 'electronics',
        subcategory: 'audio',
        brand: 'Sony',
        colors: ['Black', 'White'],
        sizes: [],
        badge: 'New',
        description: 'High-quality wireless headphones with noise cancellation.'
      },
      {
        id: '3',
        name: 'Elegant Summer Dress',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop',
        rating: 4.7,
        reviews: 156,
        discount: 20,
        category: 'fashion',
        subcategory: 'dresses',
        brand: 'Zara',
        colors: ['Blue', 'Red', 'Green'],
        sizes: ['XS', 'S', 'M', 'L'],
        badge: 'Trending',
        description: 'Beautiful summer dress perfect for any occasion.'
      },
      {
        id: '4',
        name: 'Smart Fitness Watch',
        price: 199.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        rating: 4.6,
        reviews: 203,
        discount: 20,
        category: 'electronics',
        subcategory: 'wearables',
        brand: 'Apple',
        colors: ['Black', 'Silver', 'Gold'],
        sizes: ['38mm', '42mm'],
        badge: 'Featured',
        description: 'Advanced fitness tracking with heart rate monitoring.'
      },
      {
        id: '5',
        name: 'Leather Crossbody Bag',
        price: 149.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
        rating: 4.8,
        reviews: 92,
        discount: 25,
        category: 'fashion',
        subcategory: 'accessories',
        brand: 'Coach',
        colors: ['Brown', 'Black', 'Tan'],
        sizes: [],
        badge: 'Limited',
        description: 'Genuine leather crossbody bag with premium craftsmanship.'
      },
      {
        id: '6',
        name: 'Modern Table Lamp',
        price: 69.99,
        originalPrice: 89.99,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
        rating: 4.5,
        reviews: 67,
        discount: 22,
        category: 'home',
        subcategory: 'lighting',
        brand: 'IKEA',
        colors: ['White', 'Black', 'Gold'],
        sizes: [],
        badge: 'Sale',
        description: 'Stylish modern table lamp to brighten up your space.'
      },
      {
        id: '7',
        name: 'Running Sneakers',
        price: 119.99,
        originalPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        rating: 4.7,
        reviews: 178,
        discount: 25,
        category: 'fashion',
        subcategory: 'shoes',
        brand: 'Adidas',
        colors: ['White', 'Black', 'Blue'],
        sizes: ['7', '8', '9', '10', '11'],
        badge: 'Popular',
        description: 'Comfortable running sneakers for all your athletic needs.'
      },
      {
        id: '8',
        name: 'Ceramic Coffee Mug Set',
        price: 34.99,
        originalPrice: 49.99,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop',
        rating: 4.6,
        reviews: 134,
        discount: 30,
        category: 'home',
        subcategory: 'kitchen',
        brand: 'Williams Sonoma',
        colors: ['White', 'Blue', 'Gray'],
        sizes: [],
        badge: 'Gift',
        description: 'Beautiful ceramic coffee mug set perfect for morning coffee.'
      },
      {
        id: '9',
        name: 'Wireless Gaming Mouse',
        price: 59.99,
        originalPrice: 79.99,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
        rating: 4.4,
        reviews: 89,
        discount: 25,
        category: 'electronics',
        subcategory: 'gaming',
        brand: 'Logitech',
        colors: ['Black', 'White'],
        sizes: [],
        badge: 'Gaming',
        description: 'High-precision wireless gaming mouse with RGB lighting.'
      },
      {
        id: '10',
        name: 'Denim Jacket',
        price: 89.99,
        originalPrice: 119.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
        rating: 4.5,
        reviews: 156,
        discount: 25,
        category: 'fashion',
        subcategory: 'jackets',
        brand: 'Levi\'s',
        colors: ['Blue', 'Black', 'Light Blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        badge: 'Classic',
        description: 'Timeless denim jacket that never goes out of style.'
      },
      {
        id: '11',
        name: 'Smartphone Case',
        price: 24.99,
        originalPrice: 34.99,
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop',
        rating: 4.3,
        reviews: 234,
        discount: 29,
        category: 'electronics',
        subcategory: 'accessories',
        brand: 'OtterBox',
        colors: ['Clear', 'Black', 'Blue'],
        sizes: [],
        badge: 'Protection',
        description: 'Durable smartphone case with military-grade protection.'
      },
      {
        id: '12',
        name: 'Yoga Mat',
        price: 39.99,
        originalPrice: 59.99,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
        rating: 4.7,
        reviews: 167,
        discount: 33,
        category: 'sports',
        subcategory: 'fitness',
        brand: 'Manduka',
        colors: ['Purple', 'Blue', 'Green'],
        sizes: [],
        badge: 'Eco-Friendly',
        description: 'Premium yoga mat made from sustainable materials.'
      }
    ];

    let filtered = [...products];

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search query
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In real app, would sort by date
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [category, searchParams, priceRange, selectedBrands, selectedColors, selectedSizes, selectedRating, sortBy]);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category
    });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 500]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedRating(0);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold capitalize">
                {category ? `${category} Products` : 'All Products'}
              </h1>
              <p className="text-gray-600 mt-1">
                Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} results
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
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
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Brands</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Colors</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map(color => (
                      <div key={color} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                            selectedColors.includes(color) ? 'border-primary' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.toLowerCase() === 'clear' ? 'transparent' : color.toLowerCase() }}
                          onClick={() => handleColorChange(color, !selectedColors.includes(color))}
                        />
                        <span className="text-xs mt-1">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Sizes</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map(size => (
                      <Button
                        key={size}
                        variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleSizeChange(size, !selectedSizes.includes(size))}
                        className="text-xs"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRating === rating}
                          onCheckedChange={(checked) => setSelectedRating(checked ? rating : 0)}
                        />
                        <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm">& up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

          {/* Products Grid */}
          <div className="flex-1">
            {currentProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      {viewMode === 'grid' ? (
                        <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Badge className="absolute top-3 left-3 bg-accent text-white">
                              {product.badge}
                            </Badge>
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="sm" variant="secondary" className="rounded-full p-2">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="secondary" className="rounded-full">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-primary hover:bg-primary/90"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-primary">${product.price}</span>
                                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                              </div>
                              <Badge variant="secondary" className="text-green-600">
                                -{product.discount}%
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                          <div className="flex">
                            <div className="relative w-48 h-48">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-3 left-3 bg-accent text-white">
                                {product.badge}
                              </Badge>
                            </div>
                            <CardContent className="flex-1 p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                                  <p className="text-gray-600 mb-3">{product.description}</p>
                                  <div className="flex items-center mb-2">
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-green-600">
                                    -{product.discount}%
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div>
                                    <span className="text-sm text-gray-600">Brand: </span>
                                    <span className="font-medium">{product.brand}</span>
                                  </div>
                                  {product.colors.length > 0 && (
                                    <div>
                                      <span className="text-sm text-gray-600">Colors: </span>
                                      <span className="font-medium">{product.colors.join(', ')}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Heart className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => handleAddToCart(product)}
                                  >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(i + 1)}
                        className="w-10"
                      >
                        {i + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopPage;