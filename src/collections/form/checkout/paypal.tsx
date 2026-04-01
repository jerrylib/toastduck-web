import {
    PayPalButtons,
    PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { HttpTypes } from "@medusajs/types";
import { useRouter } from "next/navigation";
import { placeOrder, initiatePaymentSession } from "@lib/data/cart";

type PayPalPaymentProps = {
    cart: HttpTypes.StoreCart;
};

export const PayPalPayment: React.FC<PayPalPaymentProps> = ({ cart }) => {
    const router = useRouter();
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
        console.error("PayPal Client ID is not set");
        return null;
    }

    const currency = cart.region?.currency_code?.toUpperCase() || "USD";

    const createOrder = async () => {
        try {
            // Check if cart has payment collection
            if (!cart?.payment_collection?.id) {
                throw new Error("Payment collection not found. Please refresh the page.")
            }

            // Check if there's an existing payment session that's not PayPal
            const existingSession = cart.payment_collection?.payment_sessions?.find(
                (s: any) => s.status === "pending" && s.provider_id !== "pp_paypal_paypal"
            )
            if (existingSession) {
                throw new Error("Cannot switch to PayPal while another payment session is active. Please refresh and try again.")
            }

            // Use Server Action to initiate payment session
            const response = await initiatePaymentSession(cart, {
                provider_id: "pp_paypal_paypal",
            }) as any;

            // The response is a payment collection with PayPal session
            // PayPal order ID is in response.payment_sessions[0].data.id
            const orderId = response?.payment_collection?.payment_sessions?.[0]?.data?.id;
            if (!orderId) {
                throw new Error("Failed to create PayPal order");
            }

            return orderId as string;
        } catch (error: any) {
            console.error("Error creating PayPal order:", error);
            // Re-throw with user-friendly message for known error
            if (error.message?.includes("Could not delete all payment sessions")) {
                throw new Error("Unable to initialize PayPal. Please refresh the page and try again.")
            }
            throw error;
        }
    };

    const onApprove = async (_data: { orderID: string }) => {
        try {
            await placeOrder();
            const countryCode = cart.shipping_address?.country_code?.toLowerCase();
            router.push(`/${countryCode}/order/confirmed`);
        } catch (error) {
            console.error("Error completing PayPal order:", error);
            throw error;
        }
    };

    const onError = (error: unknown) => {
        console.error("PayPal error:", error);
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId,
                currency,
                intent: "capture",
            }}
        >
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                style={{
                    layout: "vertical",
                    label: "pay",
                    tagline: false,
                }}
            />
        </PayPalScriptProvider>
    );
};