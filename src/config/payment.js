/**
 * Razorpay Payment Configuration
 * 
 * This file centralizes Razorpay payment gateway configuration.
 * All Razorpay-specific settings are stored here to avoid hardcoding
 * throughout the application.
 */

// Get environment-specific Razorpay API key
const getKeyId = () => {
        // For production environment
        if (process.env.NODE_ENV === 'production') {
          return process.env.REACT_APP_RAZORPAY_LIVE_KEY_ID;
        }
        // For development/test environment
        return process.env.REACT_APP_RAZORPAY_KEY_ID;
      };
      
      // Razorpay configuration object
      export const RAZORPAY_CONFIG = {
        // API Key - dynamically selected based on environment
        KEY_ID: getKeyId(),
        
        // Merchant details
        MERCHANT_NAME: "OptiClair",
        DESCRIPTION: "Payment for your order",
        LOGO_URL: "https://res.cloudinary.com/dl28vjim6/image/upload/v1749189924/logo5_jrw50m.png", // Replace with your actual logo URL
        
        // Default prefill information - can be overridden with user data
        PREFILL: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        
        // Additional information
        NOTES: {
          address: "GlassCart Corporate Office"
        },
        
        // Styling
        THEME: {
          color: "#00bac6"
        }
      };
      
      // Tax rate configuration
      export const TAX_RATE = 0.18; // 18% GST
      
      // Payment methods enabled
      export const PAYMENT_METHODS = {
        CARD: true,
        UPI: true,
        NETBANKING: true,
        WALLET: true
      };