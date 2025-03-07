import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Payment({ item, onBack }) {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [formData, setFormData] = useState({ name: "", cardNumber: "", expiry: "", cvv: "", upiId: "" });
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setPaymentSuccess(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-6">
            <Card className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
                {paymentSuccess ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h2>
                        <p className="text-gray-600 mt-2">Your order for <strong>{item.name}</strong> is confirmed!</p>
                        <Button onClick={onBack} className="mt-4">Back to Shop</Button>
                    </div>
                ) : (
                    <>
                        <CardTitle className="text-center text-lg font-semibold text-gray-700">Payment Details</CardTitle>
                        <p className="text-center text-sm text-gray-500">{item.name} - <strong>{item.price}</strong></p>
                        <CardContent>
                            <form onSubmit={handlePayment} className="space-y-4">
                                {/* Payment Method Selection */}
                                <div className="space-y-2">
                                    <label className="text-gray-600 font-medium">Select Payment Method:</label>
                                    <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="card">Card</SelectItem>
                                            <SelectItem value="upi">UPI</SelectItem>
                                            <SelectItem value="cash">Cash on Delivery</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Conditional Payment Fields */}
                                {paymentMethod === "card" && (
                                    <div className="space-y-3">
                                        <Input name="name" placeholder="Cardholder Name" value={formData.name} onChange={handleChange} required />
                                        <Input name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
                                        <div className="flex gap-4">
                                            <Input name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} required />
                                            <Input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === "upi" && (
                                    <Input name="upiId" placeholder="UPI ID (example@upi)" value={formData.upiId} onChange={handleChange} required />
                                )}

                                {paymentMethod === "cash" && (
                                    <p className="text-sm text-gray-600">You can pay in cash when your order arrives. 🎁</p>
                                )}

                                {/* Buttons */}
                                <Button type="submit" className="w-full">Pay Now</Button>
                                <Button type="button" variant="outline" className="w-full" onClick={onBack}>Cancel</Button>
                            </form>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    );
}
