import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Heart,
  Gift,
  Truck,
  Shield,
  Tag,
  CreditCard,
  Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { toast } from 'sonner';

const promoOffers = [
  {
    id: '1',
    title: 'Free Shipping',
    description: 'On orders over $100',
    icon: Truck,
    threshold: 100,
    type: 'shipping'
  },
  {
    id: '2',
    title: 'Extended Warranty',
    description: 'Free 2-year warranty on electronics',
    icon: Shield,
    threshold: 200,
    type: 'warranty'
  },
  {
    id: '3',
    title: 'Gift Wrapping',
    description: 'Complimentary gift wrapping',
    icon: Gift,
    threshold: 150,
    type: 'gift'
  }
];

const suggestedProducts = [
  {
    id: 'acc1',
    name: 'Wireless Charging Pad',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop',
    badge: 'Popular Add-on'
  },
  {
    id: 'acc2',
    name: 'Premium Cable Set',
    price: 19.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    badge: 'Best Value'
  },
  {
    id: 'acc3',
    name: 'Protective Case',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop',
    badge: 'Recommended'
  }
];

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();
  const { addToWishlist } = useWishlist();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isPromoLoading, setIsPromoLoading] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping + tax - promoDiscount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleMoveToWishlist = (item: any) => {
    addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      rating: 4.5
    });
    removeFromCart(item.id);
    toast.success('Moved to wishlist');
  };

  const handleApplyPromo = async () => {
    setIsPromoLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo(promoCode);
      toast.success('Promo code applied! 10% discount');
    } else {
      toast.error('Invalid promo code');
    }
    setIsPromoLoading(false);
  };

  const handleAddSuggested = (product: any) => {
    // This would typically add to cart
    toast.success(`Added ${product.name} to cart`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/shop')}
            className="btn-glow"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Indicators */}
            <Card className="gradient-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {promoOffers.map((offer) => {
                    const isUnlocked = subtotal >= offer.threshold;
                    const progress = Math.min((subtotal / offer.threshold) * 100, 100);
                    const remaining = Math.max(offer.threshold - subtotal, 0);
                    
                    return (
                      <div key={offer.id} className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <offer.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-medium ${isUnlocked ? 'text-primary' : ''}`}>
                              {offer.title}
                            </span>
                            {isUnlocked ? (
                              <Badge className="bg-primary text-primary-foreground">Unlocked!</Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                ${remaining.toFixed(2)} to go
                              </span>
                            )}
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Cart Items List */}
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="product-card">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {item.color && <span>Color: {item.color}</span>}
                                {item.size && <span>• Size: {item.size}</span>}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-8 h-8"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-8 h-8"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>

                              {/* Move to Wishlist */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveToWishlist(item)}
                                className="text-muted-foreground hover:text-primary"
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                Save for later
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="font-bold text-lg text-primary">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Suggested Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Frequently Bought Together
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {suggestedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {product.badge}
                      </Badge>
                      <h4 className="font-medium text-sm mb-2">{product.name}</h4>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-bold text-primary">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through ml-1">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleAddSuggested(product)}
                      >
                        Add to Cart
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    disabled={!promoCode || isPromoLoading}
                    className="btn-glow"
                  >
                    {isPromoLoading ? 'Applying...' : 'Apply'}
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm font-medium text-primary">
                      Code "{appliedPromo}" applied
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAppliedPromo(null);
                        setPromoCode('');
                        toast.success('Promo code removed');
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({getCartCount()} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      Shipping
                      {shipping === 0 && (
                        <Badge variant="secondary" className="text-xs">Free</Badge>
                      )}
                    </span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Promo Discount</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full btn-glow"
                  onClick={() => navigate('/checkout')}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Secure Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    SSL Secured
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CreditCard className="w-3 h-3" />
                    Safe Payment
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Truck className="w-3 h-3" />
                    Fast Delivery
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}