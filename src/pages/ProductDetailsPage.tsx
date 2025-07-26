import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  Users,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { toast } from 'sonner';

// Mock product data - in real app, this would come from API
const mockProduct = {
  id: '1',
  name: 'Premium Wireless Headphones',
  brand: 'AudioTech',
  price: 299.99,
  originalPrice: 399.99,
  discount: 25,
  rating: 4.8,
  reviewCount: 2847,
  inStock: true,
  stockCount: 23,
  category: 'Electronics',
  sku: 'AT-WH-001',
  description: 'Experience premium sound quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.',
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Premium leather ear cups',
    'Bluetooth 5.2 connectivity',
    'Quick charge: 5 min = 3 hours',
    'Multi-device pairing'
  ],
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Impedance': '32 ohms',
    'Weight': '280g',
    'Connectivity': 'Bluetooth 5.2, 3.5mm jack',
    'Battery': '30 hours (ANC on), 40 hours (ANC off)',
    'Charging': 'USB-C, Wireless charging'
  },
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&h=600&fit=crop'
  ],
  colors: [
    { name: 'Midnight Black', value: '#000000', available: true },
    { name: 'Silver', value: '#C0C0C0', available: true },
    { name: 'Rose Gold', value: '#E8B4B8', available: false },
    { name: 'Space Blue', value: '#1E3A8A', available: true }
  ],
  sizes: [
    { name: 'Standard', available: true },
    { name: 'Large', available: true }
  ]
};

const mockReviews = [
  {
    id: '1',
    user: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
    rating: 5,
    date: '2024-01-15',
    title: 'Absolutely amazing sound quality!',
    content: 'These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised. Perfect for long flights and daily commuting.',
    helpful: 24,
    verified: true,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop']
  },
  {
    id: '2',
    user: { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    rating: 4,
    date: '2024-01-10',
    title: 'Great value for money',
    content: 'Really impressed with the build quality and comfort. The only minor issue is that they can get a bit warm during extended use, but overall excellent product.',
    helpful: 18,
    verified: true
  },
  {
    id: '3',
    user: { name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    rating: 5,
    date: '2024-01-08',
    title: 'Perfect for work from home',
    content: 'The noise cancellation is a game-changer for video calls. Crystal clear audio and the microphone quality is excellent. Highly recommend for remote workers.',
    helpful: 31,
    verified: true
  }
];

const relatedProducts = [
  {
    id: '2',
    name: 'Wireless Earbuds Pro',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Gaming Headset RGB',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Studio Monitor Headphones',
    price: 349.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop'
  }
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(mockProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(mockProduct.id));
  }, [isInWishlist]);

  const handleAddToCart = () => {
    addToCart({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.images[0],
      quantity: quantity,
      color: selectedColor.name,
      size: selectedSize.name
    });
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(mockProduct.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: mockProduct.id,
        name: mockProduct.name,
        price: mockProduct.price,
        image: mockProduct.images[0],
        rating: mockProduct.rating
      });
      toast.success('Added to wishlist');
    }
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating: number, size = 'sm') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ${
              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = mockReviews.filter(review => {
    if (reviewFilter === 'all') return true;
    if (reviewFilter === '5') return review.rating === 5;
    if (reviewFilter === '4') return review.rating === 4;
    if (reviewFilter === '3') return review.rating === 3;
    if (reviewFilter === '2') return review.rating === 2;
    if (reviewFilter === '1') return review.rating === 1;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => navigate('/shop')} className="hover:text-foreground">Shop</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{mockProduct.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
              {mockProduct.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  -{mockProduct.discount}%
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={handleWishlistToggle}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mockProduct.images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image} alt={`${mockProduct.name} ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{mockProduct.brand}</Badge>
                <Badge variant="outline">SKU: {mockProduct.sku}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{mockProduct.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                {renderStars(mockProduct.rating)}
                <span className="text-sm text-muted-foreground">
                  {mockProduct.rating} ({mockProduct.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">${mockProduct.price}</span>
                {mockProduct.originalPrice > mockProduct.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${mockProduct.originalPrice}
                  </span>
                )}
                {mockProduct.discount > 0 && (
                  <Badge className="bg-accent text-accent-foreground">
                    Save ${(mockProduct.originalPrice - mockProduct.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {mockProduct.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-500 font-medium">In Stock</span>
                  <span className="text-muted-foreground">({mockProduct.stockCount} available)</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-500 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor.name}</h3>
              <div className="flex gap-3">
                {mockProduct.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name ? 'border-primary scale-110' : 'border-border'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                    whileHover={color.available ? { scale: 1.1 } : {}}
                    whileTap={color.available ? { scale: 0.95 } : {}}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size: {selectedSize.name}</h3>
              <div className="flex gap-3">
                {mockProduct.sizes.map((size) => (
                  <Button
                    key={size.name}
                    variant={selectedSize.name === size.name ? 'default' : 'outline'}
                    className="min-w-[80px]"
                    onClick={() => setSelectedSize(size)}
                    disabled={!size.available}
                  >
                    {size.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(mockProduct.stockCount, quantity + 1))}
                  disabled={quantity >= mockProduct.stockCount}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1 btn-glow"
                size="lg"
                onClick={handleAddToCart}
                disabled={!mockProduct.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(mockProduct.price * quantity).toFixed(2)}
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <Card className="gradient-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {mockProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Free Shipping</h4>
                  <p className="text-xs text-muted-foreground">On orders over $100</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">2 Year Warranty</h4>
                  <p className="text-xs text-muted-foreground">Full coverage</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <RotateCcw className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">30-Day Returns</h4>
                  <p className="text-xs text-muted-foreground">No questions asked</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({mockProduct.reviewCount})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {mockProduct.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3">What's in the Box</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Premium Wireless Headphones</li>
                        <li>• USB-C Charging Cable</li>
                        <li>• 3.5mm Audio Cable</li>
                        <li>• Carrying Case</li>
                        <li>• Quick Start Guide</li>
                        <li>• Warranty Card</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Compatibility</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• iOS devices (iPhone, iPad)</li>
                        <li>• Android smartphones and tablets</li>
                        <li>• Windows PC and Mac</li>
                        <li>• Gaming consoles (PS5, Xbox)</li>
                        <li>• Smart TVs with Bluetooth</li>
                        <li>• Any device with 3.5mm jack</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(mockProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 border-b border-border">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-8">
                {/* Review Summary */}
                <Card>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">{mockProduct.rating}</div>
                        {renderStars(mockProduct.rating, 'lg')}
                        <p className="text-muted-foreground mt-2">
                          Based on {mockProduct.reviewCount.toLocaleString()} reviews
                        </p>
                      </div>
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = Math.floor(Math.random() * 1000) + 100;
                          const percentage = (count / mockProduct.reviewCount) * 100;
                          return (
                            <div key={rating} className="flex items-center gap-3">
                              <span className="text-sm w-8">{rating}★</span>
                              <Progress value={percentage} className="flex-1" />
                              <span className="text-sm text-muted-foreground w-12">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Review Filters */}
                <div className="flex items-center gap-4">
                  <Button
                    variant={reviewFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setReviewFilter('all')}
                  >
                    All Reviews
                  </Button>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Button
                      key={rating}
                      variant={reviewFilter === rating.toString() ? 'default' : 'outline'}
                      onClick={() => setReviewFilter(rating.toString())}
                    >
                      {rating}★
                    </Button>
                  ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {filteredReviews.slice(0, showAllReviews ? filteredReviews.length : 3).map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.user.avatar} />
                            <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{review.user.name}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              {renderStars(review.rating)}
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <h4 className="font-semibold mb-2">{review.title}</h4>
                            <p className="text-muted-foreground mb-4">{review.content}</p>
                            {review.images && (
                              <div className="flex gap-2 mb-4">
                                {review.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`Review ${index + 1}`}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                Helpful ({review.helpful})
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredReviews.length > 3 && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? 'Show Less' : `Show All ${filteredReviews.length} Reviews`}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">Free Standard Shipping</h4>
                          <p className="text-sm text-muted-foreground">5-7 business days • Orders over $100</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Express Shipping - $9.99</h4>
                          <p className="text-sm text-muted-foreground">2-3 business days</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Next Day Delivery - $19.99</h4>
                          <p className="text-sm text-muted-foreground">Order by 2 PM for next day delivery</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Returns & Exchanges</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">30-Day Return Policy</h4>
                          <p className="text-sm text-muted-foreground">Free returns on all orders</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Easy Exchange Process</h4>
                          <p className="text-sm text-muted-foreground">Hassle-free size and color exchanges</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Warranty Coverage</h4>
                          <p className="text-sm text-muted-foreground">2-year manufacturer warranty included</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card rounded-xl p-4 cursor-pointer"
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-muted-foreground">({product.rating})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}