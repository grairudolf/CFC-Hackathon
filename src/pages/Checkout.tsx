import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    phoneNumber: "",
    country: "Cameroon",
  });

  const totalWithTax = state.total * 1.08;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    // Validate form
    if (
      !formData.email ||
      !formData.name ||
      !formData.phoneNumber ||
      !formData.city
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[+]?[\d\s\-()]+$/.test(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Initiating payment with backend...");

      const paymentData = {
        amount: Math.round(totalWithTax).toString(),
        email: formData.email,
        callback_url: `${window.location.origin}/payment-success`,
        customer: {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phoneNumber,
          city: formData.city,
          country: formData.country || "Cameroon",
        },
        items: state.items.map((item) => ({
          name: item.title,
          description: `${item.title} by ${item.author}`,
          quantity: item.quantity,
          unit_amount: item.price,
        })),
      };

      console.log("Payment data:", paymentData);

      const response = await fetch("http://localhost:5000/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const responseText = await response.text();
      console.log("Backend response text:", responseText);

      if (!response.ok) {
        console.error("Payment API error:", response.status, responseText);
        let errorMessage = "Payment initiation failed";

        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.details || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }

        toast.error(`Payment failed: ${errorMessage}`);
        return;
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response:", e);
        toast.error("Invalid response from payment service");
        return;
      }

      console.log("Payment response:", result);

      // Check for payment URL in different possible response structures
      const paymentUrl =
        result.payment_url ||
        result.data?.payment_url ||
        result.checkout_url ||
        result.url;

      if (paymentUrl) {
        toast.success("Redirecting to payment...");
        clearCart();
        window.location.href = paymentUrl;
      } else {
        console.error("No payment URL in response:", result);
        toast.error("Payment URL not received. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            No items to checkout
          </h2>
          <p className="text-gray-600 mb-8">
            Add some books to your cart first.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform transition-all duration-200 hover:scale-105"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Button
        onClick={() => navigate("/cart")}
        variant="ghost"
        className="mb-8 text-purple-900 hover:text-purple-700 hover:bg-purple-100 transition-all duration-200 hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Billing Information */}
        <div className="space-y-4">
          <Card className="p-4">
            <CardHeader>
              <h2 className="text-lg font-bold">Billing Information</h2>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border-purple-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div  className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    type="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full border-purple-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                 <div  className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="phoneNumber"
                    placeholder="+237 6XX XXX XXX"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full border-purple-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jonhdoe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border-purple-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Where do you live?"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border-purple-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                  </div>
                  {/* <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      className="w-full border-purple-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                  </div> */}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card className="p-4">
            <CardHeader>
              <h2 className="text-lg font-bold">Order Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{state.total.toLocaleString()} CFA</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>{(state.total * 0.08).toLocaleString()} CFA</span>
              </div>

              <hr className="border-purple-200 my-4" />

              <div className="flex justify-between text-xl font-bold text-purple-900">
                <span>Total:</span>
                <span>{Math.round(totalWithTax).toLocaleString()} CFA</span>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-6 transform transition-all duration-200 hover:scale-105 disabled:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Pay with Nkwa
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Your payment information is secure and encrypted
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
