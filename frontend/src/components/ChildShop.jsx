import { useState } from "react";
import { useCart } from "../cartContext"; // Import useCart hook
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BuyNow from "@/components/BuyNow";

export default function ChildShop() {
    const { addToCart } = useCart(); // Access addToCart function from global state
    const [selectedItem, setSelectedItem] = useState(null);

    const items = [
        { name: "Teddy Bear", image: "/background/logo.png", description: "Soft and cuddly teddy bear.", price: "$20" },
        { name: "Lego Set", image: "/images/lego.jpg", description: "Creative Lego building set.", price: "$35" },
        { name: "Doll House", image: "/images/dollhouse.jpg", description: "Beautiful wooden doll house.", price: "$50" },
        { name: "Remote Car", image: "/images/remotecar.jpg", description: "Fast remote-controlled car.", price: "$40" }
    ];

    return (
        <div className="bg-pink-50 min-h-screen p-6">
            {selectedItem ? (
                <BuyNow item={selectedItem} onBack={() => setSelectedItem(null)} />
            ) : (
                <>
                    <h1 className="text-4xl font-bold text-pink-600 text-center mb-8">Child Shop</h1>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items.map((item, index) => (
                            <Card key={index} className="rounded-xl shadow-lg">
                                <img src={item.image} alt={item.name} className="rounded-t-xl w-full h-40 object-cover" />
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg text-gray-800">{item.name}</CardTitle>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-lg font-semibold text-pink-500">{item.price}</p>
                                    <div className="flex gap-2 mt-3">
                                        <Button onClick={() => setSelectedItem(item)} variant="default">
                                            Buy Now
                                        </Button>
                                        <Button onClick={() => addToCart(item)} variant="outline">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
