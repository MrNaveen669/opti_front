import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const PrivacyPolicy = () => {
    return (
        <div className="container" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }} >
            <Navbar />
            <h1>Shipping Policy</h1>

            <p><strong>Last updated: April 28, 2025</strong></p>

            <p>
                Shipping Policy
                At Clear Vision Optical, we aim to deliver your products safely and on time. Please read our shipping policy below for more details:
            </p>
                <h3> 1. Shipping Charges:</h3>
            <p>
                
                We offer free shipping on all orders above ₹899 within India. For orders below ₹899, a flat shipping fee of ₹50 will be applied.
            </p>

            <h3>2. Delivery Time:</h3>
            <p>
                
                Orders are processed within 1-2 business days after payment confirmation.

                Delivery typically takes 5-7 business days depending on your location.

                Remote areas may require additional time for delivery.
            </p>

            <h3>3 Tracking: </h3>
            <p>
            Once your order is shipped, you will receive a tracking number via email or SMS to track your package.</p>

            <h2>4. Delivery Areas:</h2>
            <p>
            We currently ship only within India. International shipping is not available at this time.</p>
            
            <h3>5. Delays :</h3>
                <p>
            
            We are not responsible for shipping delays caused by courier services, natural disasters, strikes, or any unforeseen circumstances.
                </p>

            <h2>6. Damaged or Lost Packages:</h2>
            <p>
            
            If your package arrives damaged or is lost in transit, please contact us within 48 hours of delivery at:
            
               
                or contact us at <strong>8817415179</strong> or{" "}
                <strong><a href="mailto:clearvisionoptical.r@gmail.com">clearvisionoptical.r@gmail.com</a></strong> as soon as possible.
                We will promptly correct any information found to be incorrect.
            </p>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
