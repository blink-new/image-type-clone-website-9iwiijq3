import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Lock, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Check,
  ChevronLeft,
  Shield,
  AlertCircle,
  Gift,
  Calendar,
  Building
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, American Express'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: () => (
      <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
        P
      </div>
    ),
    description: 'Pay with your PayPal account'
  },
  {
    id: 'apple',
    name: 'Apple Pay',
    icon: () => (
      <div className="w-5 h-5 bg-black rounded text-white text-xs flex items-center justify-center font-bold">
        
      </div>
    ),
    description: 'Touch ID or Face ID'
  },
  {
    id: 'google',
    name: 'Google Pay',
    icon: () => (
      <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
        G
      </div>
    ),
    description: 'Pay with Google'
  }
];

const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 0,
    duration: '5-7 business days',
    description: 'Free shipping on orders over $100'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 9.99,
    duration: '2-3 business days',
    description: 'Faster delivery'
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    price: 19.99,
    duration: '1 business day',
    description: 'Next day delivery'
  }
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getCartTotal, getCartCount, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const subtotal = getCartTotal();
  const selectedShipping = shippingMethods.find(method => method.id === shippingMethod);
  const shippingCost = subtotal >= 100 && shippingMethod === 'standard' ? 0 : selectedShipping?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'card') {
      setCardInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
      return required.every(field => shippingInfo[field as keyof typeof shippingInfo]);
    }
    if (step === 2) {
      if (paymentMethod === 'card') {
        return cardInfo.number && cardInfo.expiry && cardInfo.cvc && cardInfo.name;
      }
      return true;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) {
      toast.error('Please complete payment information');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart before checkout.</p>
          <Button onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order #ORD-{Date.now().toString().slice(-6)} has been confirmed.
          </p>
          <div className="space-y-3">
            <Button className="w-full" onClick={() => navigate('/orders')}>
              Track Your Order
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-4">
            <span className={`text-sm ${currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Shipping
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Payment
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Shipping Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Contact Information */}
                      <div>
                        <h3 className="font-semibold mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              value={shippingInfo.firstName}
                              onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              value={shippingInfo.lastName}
                              onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                              placeholder="Doe"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={shippingInfo.email}
                              onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={shippingInfo.phone}
                              onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Shipping Address */}
                      <div>
                        <h3 className="font-semibold mb-4">Shipping Address</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="address">Address *</Label>
                            <Input
                              id="address"
                              value={shippingInfo.address}
                              onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                              placeholder="123 Main Street"
                            />
                          </div>
                          <div>
                            <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                            <Input
                              id="apartment"
                              value={shippingInfo.apartment}
                              onChange={(e) => handleInputChange('shipping', 'apartment', e.target.value)}
                              placeholder="Apt 4B"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="city">City *</Label>
                              <Input
                                id="city"
                                value={shippingInfo.city}
                                onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                                placeholder="New York"
                              />
                            </div>
                            <div>
                              <Label htmlFor="state">State *</Label>
                              <Select
                                value={shippingInfo.state}
                                onValueChange={(value) => handleInputChange('shipping', 'state', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NY">New York</SelectItem>
                                  <SelectItem value="CA">California</SelectItem>
                                  <SelectItem value="TX">Texas</SelectItem>
                                  <SelectItem value="FL">Florida</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="zipCode">ZIP Code *</Label>
                              <Input
                                id="zipCode"
                                value={shippingInfo.zipCode}
                                onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                                placeholder="10001"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Method */}
                      <div>
                        <h3 className="font-semibold mb-4">Shipping Method</h3>
                        <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                          {shippingMethods.map((method) => (
                            <div key={method.id} className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={method.id} className="font-medium">
                                    {method.name}
                                  </Label>
                                  <span className="font-semibold">
                                    {method.price === 0 && subtotal >= 100 ? 'Free' : `$${method.price}`}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{method.duration}</p>
                                <p className="text-xs text-muted-foreground">{method.description}</p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="saveInfo"
                            checked={saveInfo}
                            onCheckedChange={setSaveInfo}
                          />
                          <Label htmlFor="saveInfo" className="text-sm">
                            Save this information for next time
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={subscribeNewsletter}
                            onCheckedChange={setSubscribeNewsletter}
                          />
                          <Label htmlFor="newsletter" className="text-sm">
                            Subscribe to our newsletter for exclusive offers
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    {/* Payment Method */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Payment Method
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                          <TabsList className="grid w-full grid-cols-4">
                            {paymentMethods.map((method) => (
                              <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                                <method.icon />
                                <span className="hidden sm:inline">{method.name.split(' ')[0]}</span>
                              </TabsTrigger>
                            ))}
                          </TabsList>

                          <TabsContent value="card" className="mt-6">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="cardNumber">Card Number *</Label>
                                <Input
                                  id="cardNumber"
                                  value={cardInfo.number}
                                  onChange={(e) => handleInputChange('card', 'number', formatCardNumber(e.target.value))}
                                  placeholder="1234 5678 9012 3456"
                                  maxLength={19}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="expiry">Expiry Date *</Label>
                                  <Input
                                    id="expiry"
                                    value={cardInfo.expiry}
                                    onChange={(e) => handleInputChange('card', 'expiry', formatExpiry(e.target.value))}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="cvc">CVC *</Label>
                                  <Input
                                    id="cvc"
                                    value={cardInfo.cvc}
                                    onChange={(e) => handleInputChange('card', 'cvc', e.target.value.replace(/\D/g, ''))}
                                    placeholder="123"
                                    maxLength={4}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="cardName">Name on Card *</Label>
                                <Input
                                  id="cardName"
                                  value={cardInfo.name}
                                  onChange={(e) => handleInputChange('card', 'name', e.target.value)}
                                  placeholder="John Doe"
                                />
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="paypal" className="mt-6">
                            <div className="text-center py-8">
                              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">PayPal</span>
                              </div>
                              <p className="text-muted-foreground">You will be redirected to PayPal to complete your payment.</p>
                            </div>
                          </TabsContent>

                          <TabsContent value="apple" className="mt-6">
                            <div className="text-center py-8">
                              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl"></span>
                              </div>
                              <p className="text-muted-foreground">Use Touch ID or Face ID to pay with Apple Pay.</p>
                            </div>
                          </TabsContent>

                          <TabsContent value="google" className="mt-6">
                            <div className="text-center py-8">
                              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">G</span>
                              </div>
                              <p className="text-muted-foreground">Pay quickly and securely with Google Pay.</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>

                    {/* Billing Address */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building className="w-5 h-5" />
                          Billing Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox
                            id="sameAsShipping"
                            checked={sameAsShipping}
                            onCheckedChange={setSameAsShipping}
                          />
                          <Label htmlFor="sameAsShipping">
                            Same as shipping address
                          </Label>
                        </div>

                        {!sameAsShipping && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="billingFirstName">First Name *</Label>
                                <Input
                                  id="billingFirstName"
                                  value={billingInfo.firstName}
                                  onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="billingLastName">Last Name *</Label>
                                <Input
                                  id="billingLastName"
                                  value={billingInfo.lastName}
                                  onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="billingAddress">Address *</Label>
                              <Input
                                id="billingAddress"
                                value={billingInfo.address}
                                onChange={(e) => handleInputChange('billing', 'address', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="billingCity">City *</Label>
                                <Input
                                  id="billingCity"
                                  value={billingInfo.city}
                                  onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="billingState">State *</Label>
                                <Select
                                  value={billingInfo.state}
                                  onValueChange={(value) => handleInputChange('billing', 'state', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="NY">New York</SelectItem>
                                    <SelectItem value="CA">California</SelectItem>
                                    <SelectItem value="TX">Texas</SelectItem>
                                    <SelectItem value="FL">Florida</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="billingZipCode">ZIP Code *</Label>
                                <Input
                                  id="billingZipCode"
                                  value={billingInfo.zipCode}
                                  onChange={(e) => handleInputChange('billing', 'zipCode', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold mb-4">Order Items</h3>
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} • ${item.price.toFixed(2)} each
                                </p>
                              </div>
                              <div className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Shipping & Payment Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2">Shipping Address</h3>
                          <div className="text-sm text-muted-foreground">
                            <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                            <p>{shippingInfo.address}</p>
                            {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                            <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Payment Method</h3>
                          <div className="text-sm text-muted-foreground">
                            {paymentMethod === 'card' && (
                              <p>**** **** **** {cardInfo.number.slice(-4)}</p>
                            )}
                            {paymentMethod !== 'card' && (
                              <p>{paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Place Order Button */}
                      <Button
                        size="lg"
                        className="w-full btn-glow"
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Place Order - ${total.toFixed(2)}
                          </>
                        )}
                      </Button>

                      {/* Security Notice */}
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Shield className="w-3 h-3" />
                        <span>Your payment information is secure and encrypted</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {!isProcessing && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentStep < 3 && (
                  <Button onClick={handleNextStep}>
                    Next
                    <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="gradient-card sticky top-8">
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
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      SSL Secured
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Encrypted
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our customer service team is here to help you with your order.
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}