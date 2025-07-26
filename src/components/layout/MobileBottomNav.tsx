import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Search, 
  ShoppingBag, 
  Heart, 
  User,
  ShoppingCart
} from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { Badge } from '../ui/badge'

const navItems = [
  {
    path: '/',
    icon: Home,
    label: 'Home',
    activeColor: 'text-primary'
  },
  {
    path: '/search',
    icon: Search,
    label: 'Search',
    activeColor: 'text-primary'
  },
  {
    path: '/shop',
    icon: ShoppingBag,
    label: 'Shop',
    activeColor: 'text-primary'
  },
  {
    path: '/cart',
    icon: ShoppingCart,
    label: 'Cart',
    activeColor: 'text-primary',
    showBadge: true
  },
  {
    path: '/profile',
    icon: User,
    label: 'Profile',
    activeColor: 'text-primary'
  }
]

export default function MobileBottomNav() {
  const location = useLocation()
  const { items } = useCart()
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-border pb-safe"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center p-2 min-w-[60px]"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Icon with badge */}
              <div className="relative">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 rounded-xl transition-colors duration-200 ${
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                
                {/* Cart badge */}
                {item.showBadge && cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
                  >
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </Badge>
                )}
              </div>
              
              {/* Label */}
              <span 
                className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}