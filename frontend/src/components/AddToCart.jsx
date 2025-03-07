import { useCart } from "../cartContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AddToCart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart(); // Access cart state & actions

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cart.map((item, index) => (
                        <Card key={index} className="rounded-xl shadow-lg">
                            <img src={item.image} alt={item.name} className="rounded-t-xl w-full h-40 object-cover" />
                            <CardContent className="p-4">
                                <CardTitle className="text-lg text-gray-800">{item.name}</CardTitle>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <p className="text-lg font-semibold text-pink-500">{item.price}</p>
                                <div className="flex items-center mt-3">
                                    <Button 
                                        onClick={() => updateQuantity(item, item.quantity - 1)} 
                                        disabled={item.quantity <= 1} 
                                        variant="outline"
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <Button onClick={() => updateQuantity(item, item.quantity + 1)} variant="outline">
                                        +
                                    </Button>
                                </div>
                                <Button 
                                    onClick={() => removeFromCart(item)} 
                                    variant="destructive" 
                                    className="mt-3"
                                >
                                    Remove
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="text-center mt-8">
                    <Button onClick={()=>{
                        navigate
                    }} variant="default" className="bg-green-600 text-white px-6 py-2">
                        Checkout
                    </Button>
                </div>
            )}
        </div>
    );
}
