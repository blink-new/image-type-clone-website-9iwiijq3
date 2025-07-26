import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Package, 
  Tag, 
  Heart, 
  Star,
  Truck,
  CheckCircle,
  X,
  Settings,
  Filter,
  MoreVertical
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Switch } from '../components/ui/switch'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import { toast } from 'sonner'

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order #ORD-2024-001 has been delivered successfully.',
    time: '2 hours ago',
    read: false,
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Flash Sale Alert!',
    message: 'Up to 70% off on electronics. Limited time offer ending soon!',
    time: '4 hours ago',
    read: false,
    icon: Tag,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    id: 3,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #ORD-2024-002 is on its way. Track your package.',
    time: '1 day ago',
    read: true,
    icon: Truck,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 4,
    type: 'wishlist',
    title: 'Price Drop Alert',
    message: 'Smart Fitness Watch in your wishlist is now 25% off!',
    time: '2 days ago',
    read: true,
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    id: 5,
    type: 'review',
    title: 'Review Reminder',
    message: 'How was your recent purchase? Share your experience.',
    time: '3 days ago',
    read: true,
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    id: 6,
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #ORD-2024-003 has been confirmed and is being processed.',
    time: '5 days ago',
    read: true,
    icon: Package,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [filter, setFilter] = useState('all')
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    priceAlerts: true,
    reviews: false,
    newsletter: true,
    push: true,
    email: true,
    sms: false
  })

  const unreadCount = notificationList.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
    toast.success('All notifications marked as read')
  }

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id))
    toast.success('Notification deleted')
  }

  const clearAll = () => {
    setNotificationList([])
    toast.success('All notifications cleared')
  }

  const filteredNotifications = notificationList.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    return notification.type === filter
  })

  const getNotificationsByType = (type: string) => {
    return notificationList.filter(n => n.type === type)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount}</Badge>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="hidden md:block text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your orders and offers
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <CheckCircle size={16} className="mr-2" />
                  Mark All Read
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={clearAll}>
                    Clear All Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Export Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>

        {/* Notification Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notifications">
                <Bell size={16} className="mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings size={16} className="mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              {/* Filter Tabs */}
              <div className="mb-6">
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                    <TabsTrigger value="all">
                      All ({notificationList.length})
                    </TabsTrigger>
                    <TabsTrigger value="unread">
                      Unread ({unreadCount})
                    </TabsTrigger>
                    <TabsTrigger value="order">
                      Orders ({getNotificationsByType('order').length})
                    </TabsTrigger>
                    <TabsTrigger value="promotion">
                      Offers ({getNotificationsByType('promotion').length})
                    </TabsTrigger>
                    <TabsTrigger value="wishlist">
                      Wishlist ({getNotificationsByType('wishlist').length})
                    </TabsTrigger>
                    <TabsTrigger value="review">
                      Reviews ({getNotificationsByType('review').length})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Notifications List */}
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Bell size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                      <p className="text-muted-foreground">
                        {filter === 'all' 
                          ? "You're all caught up! No notifications to show."
                          : `No ${filter} notifications found.`
                        }
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`hover:shadow-md transition-all cursor-pointer ${
                          !notification.read ? 'border-primary/50 bg-primary/5' : ''
                        }`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            {/* Icon */}
                            <div className={`p-2 rounded-full ${notification.bgColor} flex-shrink-0`}>
                              <notification.icon size={20} className={notification.color} />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className={`font-semibold mb-1 ${
                                    !notification.read ? 'text-foreground' : 'text-muted-foreground'
                                  }`}>
                                    {notification.title}
                                    {!notification.read && (
                                      <span className="inline-block w-2 h-2 bg-primary rounded-full ml-2"></span>
                                    )}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {notification.time}
                                  </p>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex items-center space-x-2 ml-4">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        markAsRead(notification.id)
                                      }}
                                    >
                                      <CheckCircle size={16} />
                                    </Button>
                                  )}
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                  >
                                    <X size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-6">
                {/* Notification Types */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Order Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about order status changes
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.orderUpdates}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, orderUpdates: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Promotions & Deals</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications about sales and offers
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.promotions}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, promotions: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Price Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified when wishlist items go on sale
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.priceAlerts}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, priceAlerts: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Review Reminders</div>
                        <div className="text-sm text-muted-foreground">
                          Reminders to review your purchases
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.reviews}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, reviews: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Newsletter</div>
                        <div className="text-sm text-muted-foreground">
                          Weekly newsletter with new products and tips
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.newsletter}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, newsletter: checked})
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications in the app
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.push}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, push: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.email}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, email: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive important updates via SMS
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.sms}
                        onCheckedChange={(checked) => 
                          setNotificationSettings({...notificationSettings, sms: checked})
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Save Settings */}
                <div className="flex justify-end">
                  <Button onClick={() => toast.success('Notification settings saved!')}>
                    Save Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}