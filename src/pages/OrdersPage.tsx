import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Download,
  Eye,
  Star,
  MessageCircle
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

// Mock orders data
const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-25',
    status: 'delivered',
    total: 299.99,
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop'
      },
      {
        id: 2,
        name: 'Phone Case',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=80&h=80&fit=crop'
      }
    ],
    shipping: {
      address: '123 Main St, New York, NY 10001',
      method: 'Standard Shipping',
      tracking: 'TRK123456789'
    },
    deliveredDate: '2024-01-28'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 149.99,
    items: [
      {
        id: 3,
        name: 'Smart Fitness Watch',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop'
      }
    ],
    shipping: {
      address: '123 Main St, New York, NY 10001',
      method: 'Express Shipping',
      tracking: 'TRK987654321'
    },
    estimatedDelivery: '2024-01-26'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-18',
    status: 'processing',
    total: 89.99,
    items: [
      {
        id: 4,
        name: 'Organic Skincare Set',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=80&h=80&fit=crop'
      }
    ],
    shipping: {
      address: '123 Main St, New York, NY 10001',
      method: 'Standard Shipping'
    },
    estimatedDelivery: '2024-01-30'
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-15',
    status: 'cancelled',
    total: 199.99,
    items: [
      {
        id: 5,
        name: 'Professional Camera Lens',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=80&h=80&fit=crop'
      }
    ],
    shipping: {
      address: '123 Main St, New York, NY 10001',
      method: 'Standard Shipping'
    },
    cancelledDate: '2024-01-16',
    cancelReason: 'Customer requested cancellation'
  }
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'cancelled':
        return <Package className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b px-4 py-4">
        <h1 className="text-xl font-bold">My Orders</h1>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="hidden md:block text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Search orders by ID or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter size={16} className="mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="amount-high">Highest Amount</SelectItem>
                    <SelectItem value="amount-low">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Status Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">
                All ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="processing">
                Processing ({getOrdersByStatus('processing').length})
              </TabsTrigger>
              <TabsTrigger value="shipped">
                Shipped ({getOrdersByStatus('shipped').length})
              </TabsTrigger>
              <TabsTrigger value="delivered">
                Delivered ({getOrdersByStatus('delivered').length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({getOrdersByStatus('cancelled').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(order.status)}
                            <div>
                              <CardTitle className="text-lg">{order.id}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                Ordered on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 mt-3 md:mt-0">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                            <span className="text-lg font-bold">${order.total}</span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        {/* Order Items */}
                        <div className="space-y-3 mb-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ${item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Info */}
                        <div className="border-t pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium mb-1">Shipping Address</p>
                              <p className="text-muted-foreground">{order.shipping.address}</p>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Shipping Method</p>
                              <p className="text-muted-foreground">{order.shipping.method}</p>
                            </div>
                          </div>

                          {/* Status-specific info */}
                          {order.status === 'delivered' && order.deliveredDate && (
                            <div className="mt-3 p-3 bg-green-50 rounded-lg">
                              <p className="text-sm text-green-800">
                                ✅ Delivered on {new Date(order.deliveredDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}

                          {order.status === 'shipped' && order.shipping.tracking && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                🚚 Tracking: {order.shipping.tracking}
                                {order.estimatedDelivery && (
                                  <span className="block">
                                    Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                  </span>
                                )}
                              </p>
                            </div>
                          )}

                          {order.status === 'processing' && order.estimatedDelivery && (
                            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                ⏳ Processing your order. Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </p>
                            </div>
                          )}

                          {order.status === 'cancelled' && (
                            <div className="mt-3 p-3 bg-red-50 rounded-lg">
                              <p className="text-sm text-red-800">
                                ❌ Cancelled on {new Date(order.cancelledDate!).toLocaleDateString()}
                                {order.cancelReason && (
                                  <span className="block">Reason: {order.cancelReason}</span>
                                )}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm">
                            <Eye size={16} className="mr-2" />
                            View Details
                          </Button>
                          
                          {order.status === 'shipped' && (
                            <Button variant="outline" size="sm">
                              <Truck size={16} className="mr-2" />
                              Track Package
                            </Button>
                          )}
                          
                          {order.status === 'delivered' && (
                            <>
                              <Button variant="outline" size="sm">
                                <Star size={16} className="mr-2" />
                                Write Review
                              </Button>
                              <Button variant="outline" size="sm">
                                <Package size={16} className="mr-2" />
                                Buy Again
                              </Button>
                            </>
                          )}
                          
                          <Button variant="outline" size="sm">
                            <Download size={16} className="mr-2" />
                            Invoice
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <MessageCircle size={16} className="mr-2" />
                            Support
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Other status tabs would filter the orders accordingly */}
            {['processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <TabsContent key={status} value={status}>
                <div className="space-y-4">
                  {getOrdersByStatus(status).map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Same order card structure as above */}
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(order.status)}
                              <div>
                                <CardTitle className="text-lg">{order.id}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  Ordered on {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3 mt-3 md:mt-0">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                              <span className="text-lg font-bold">${order.total}</span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="space-y-3 mb-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center space-x-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Qty: {item.quantity} × ${item.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}