import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { state, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any books to your cart yet.
          </p>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-amber-900 mb-8">Shopping Cart</h1>
          <div className="space-y-4">
            {state.items.map((item) => (
              <Card key={item._id} className="bg-white/70 backdrop-blur-sm border-amber-200">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-amber-900 mb-1 truncate">
                        {item.title}
                      </h3>
                      <p className="text-amber-700 mb-2">by {item.author}</p>
                      <p className="text-lg font-bold text-orange-600 mb-4">
                        {item.price.toLocaleString()} CFA
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="h-8 w-8 border-amber-300"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium text-amber-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className="h-8 w-8 border-amber-300"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="bg-white/70 backdrop-blur-sm border-amber-200 sticky top-24">
            <CardHeader>
              <CardTitle className="text-amber-900">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {state.items.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="truncate mr-2">
                      {item.title} (×{item.quantity})
                    </span>
                    <span>{(item.price * item.quantity).toLocaleString()} CFA</span>
                  </div>
                ))}
              </div>
              
              <hr className="border-amber-200" />
              
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{state.total.toLocaleString()} CFA</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{(state.total * 0.08).toLocaleString()} CFA</span>
              </div>
              
              <hr className="border-amber-200" />
              
              <div className="flex justify-between text-lg font-bold text-amber-900">
                <span>Total:</span>
                <span>{(state.total * 1.08).toLocaleString()} CFA</span>
              </div>
              
              <Link to="/checkout" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link to="/" className="block">
                <Button variant="outline" className="w-full border-amber-300 text-amber-900 hover:bg-amber-50">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
