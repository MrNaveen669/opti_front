import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const CancellationsAndRefunds = () => {
  return (
    <div className="container" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Navbar />
      <h1>Cancellation and Refund Policy</h1>

      <p><strong>Last updated: April 28, 2025</strong></p>

      <p>
        At TUKESHWAR SAHU, we value our customers and strive to provide the best
        service possible. We have a flexible cancellation and refund policy as
        outlined below:
      </p>

      <ul>
        <li>
          Cancellations are allowed only if requested within <strong>7 days</strong> of placing the order.
          Cancellation requests may not be accepted if the order has already been processed or shipped by our vendors or merchants.
        </li>
        <li>
          We do not accept cancellations for perishable items such as flowers, food, or similar products.
          However, if the customer provides proof of poor product quality, a refund or replacement may be issued.
        </li>
        <li>
          If you receive a damaged or defective product, please report it to our <strong>Customer Service</strong> within <strong>7 days</strong> of receipt.
          We will verify the issue with the merchant and process the request accordingly.
        </li>
        <li>
          If you believe the product received differs from what was shown on the website or does not meet your expectations, please notify our Customer Service team within <strong>7 days</strong>.
          We will review your complaint and respond with an appropriate resolution.
        </li>
        <li>
          For products covered by a manufacturer’s warranty, please contact the manufacturer directly for claims.
        </li>
        <li>
          Any refunds approved by TUKESHWAR SAHU will be processed within <strong>9 to 15 business days</strong> to the original payment method.
        </li>
      </ul>

      <Footer />
    </div>
  );
};

export default CancellationsAndRefunds;
