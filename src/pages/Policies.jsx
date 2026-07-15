import React, { useState } from 'react';

export default function Policies() {
  const [activePolicy, setActivePolicy] = useState('terms'); // terms, privacy, shipping, return

  return (
    <div
      className="container page-fade-in"
      style={{
        paddingBlock: "48px",
        display: "flex",
        gap: "48px",
        textAlign: "left",
      }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "240px", flexShrink: 0 }}>
        <h3
          className="serif-title"
          style={{
            fontSize: "20px",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "12px",
            marginBottom: "16px",
          }}>
          Store Rules
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={() => setActivePolicy("terms")}
            className={`tab-btn ${activePolicy === "terms" ? "active" : ""}`}
            style={{
              textAlign: "left",
              padding: "10px 16px",
              borderRadius: "6px",
              width: "100%",
              borderBottom: "none",
              background:
                activePolicy === "terms"
                  ? "var(--primary-light)"
                  : "transparent",
              color: activePolicy === "terms" ? "var(--primary)" : "inherit",
              fontWeight: activePolicy === "terms" ? 700 : 500,
            }}>
            Terms & Conditions
          </button>

          <button
            onClick={() => setActivePolicy("privacy")}
            className={`tab-btn ${activePolicy === "privacy" ? "active" : ""}`}
            style={{
              textAlign: "left",
              padding: "10px 16px",
              borderRadius: "6px",
              width: "100%",
              borderBottom: "none",
              background:
                activePolicy === "privacy"
                  ? "var(--primary-light)"
                  : "transparent",
              color: activePolicy === "privacy" ? "var(--primary)" : "inherit",
              fontWeight: activePolicy === "privacy" ? 700 : 500,
            }}>
            Privacy Policy
          </button>

          <button
            onClick={() => setActivePolicy("shipping")}
            className={`tab-btn ${activePolicy === "shipping" ? "active" : ""}`}
            style={{
              textAlign: "left",
              padding: "10px 16px",
              borderRadius: "6px",
              width: "100%",
              borderBottom: "none",
              background:
                activePolicy === "shipping"
                  ? "var(--primary-light)"
                  : "transparent",
              color: activePolicy === "shipping" ? "var(--primary)" : "inherit",
              fontWeight: activePolicy === "shipping" ? 700 : 500,
            }}>
            Shipping Policy
          </button>

          <button
            onClick={() => setActivePolicy("return")}
            className={`tab-btn ${activePolicy === "return" ? "active" : ""}`}
            style={{
              textAlign: "left",
              padding: "10px 16px",
              borderRadius: "6px",
              width: "100%",
              borderBottom: "none",
              background:
                activePolicy === "return"
                  ? "var(--primary-light)"
                  : "transparent",
              color: activePolicy === "return" ? "var(--primary)" : "inherit",
              fontWeight: activePolicy === "return" ? 700 : 500,
            }}>
            Refund & Return
          </button>
        </div>
      </aside>

      {/* Policy Contents Column */}
      <main
        style={{
          flexGrow: 1,
          maxWidth: "800px",
          lineHeight: 1.8,
          padding: "40px",
          borderRadius: "16px",
          border: "1px solid var(--border)",
        }}
        className="glass">
        {activePolicy === "terms" && (
          <div>
            <h1
              className="serif-title"
              style={{
                fontSize: "28px",
                color: "var(--text-heading)",
                marginBottom: "24px",
              }}>
              Terms & Conditions of Service
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
              Last Updated: June 15, 2026
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              1. Agreement to Terms
            </h3>
            <p>
              By accessing our website at Aura, you agree to comply with and be
              bound by these terms of service, all applicable laws and
              regulations, and agree that you are responsible for compliance
              with any local laws. If you do not agree with any of these terms,
              you are prohibited from using this site.
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              2. Intellectual Property License
            </h3>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Aura's website for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not modify the materials, use them for commercial
              display, or attempt to decompile any software code.
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              3. Limitation of Liability
            </h3>
            <p>
              In no event shall Aura or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use or
              inability to use the materials on Aura's website, even if Aura has
              been notified orally or in writing of the possibility of such
              damage.
            </p>
          </div>
        )}

        {activePolicy === "privacy" && (
          <div>
            <h1
              className="serif-title"
              style={{
                fontSize: "28px",
                color: "var(--text-heading)",
                marginBottom: "24px",
              }}>
              Privacy & Data Collection Policy
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
              Last Updated: June 15, 2026
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              1. Information We Collect
            </h3>
            <p>
              We collect information from you when you register on our site,
              place an order, subscribe to our newsletter, or fill out support
              forms. When ordering or registering on our site, you may be asked
              to enter your name, email address, physical shipping address,
              phone number, or card credentials.
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              2. Data Encrypting and Protection
            </h3>
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information when you place an order. We offer the
              use of a secure server. All supplied sensitive/credit information
              is transmitted via Secure Socket Layer (SSL) technology and then
              encrypted into our Payment gateway providers database only to be
              accessible by authorized personnel with special access rights.
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              3. Use of Cookies
            </h3>
            <p>
              Yes, we use cookies to help us remember and process the items in
              your shopping cart, understand and save your preferences for
              future visits, and compile aggregate data about site traffic and
              site interaction.
            </p>
          </div>
        )}

        {activePolicy === "shipping" && (
          <div>
            <h1
              className="serif-title"
              style={{
                fontSize: "28px",
                color: "var(--text-heading)",
                marginBottom: "24px",
              }}>
              Shipping & Customs Policy
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
              Last Updated: June 15, 2026
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              1. Dispatch Timelines
            </h3>
            <p>
              Orders placed before 2:00 PM local time are dispatched to our
              courier partners (UPS, FedEx, DHL) on the same business day. All
              other orders are packaged and handed over within 24 hours.
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              2. Shipping Zones & Rates
            </h3>
            <p>
              We offer standard shipping (3-5 business days) for flat $9.99,
              which is free for purchases exceeding $100. Expedited Express
              Shipping (1-2 business days) is flat $19.99. International
              shipments take 7-14 business days with custom rates computed
              dynamically at checkout.
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              3. Tracking
            </h3>
            <p>
              Once your package leaves our fulfillment hubs, a tracking URL
              containing your carrier codes is updated in your Customer
              Dashboard. You will receive notifications when the parcel is in
              transit and out for delivery.
            </p>
          </div>
        )}

        {activePolicy === "return" && (
          <div>
            <h1
              className="serif-title"
              style={{
                fontSize: "28px",
                color: "var(--text-heading)",
                marginBottom: "24px",
              }}>
              Return, Refund & Exchange Policy
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
              Last Updated: June 15, 2026
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              1. 30-Day Evaluation Period
            </h3>
            <p>
              We want you to be completely satisfied with your premium Aura
              gear. You may return any unopened, unused, or defective
              merchandise within 30 days of receiving the order for a full cash
              refund to the original payment card.
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              2. Submitting Return Requests
            </h3>
            <p>
              Log in, navigate to Dashboard to My Orders, and locate the item
              you want to return. Click "Request Return", select a return
              reason, and submit. We will issue a pre-paid printable shipping
              label via email.
            </p>

            <h3 style={{ fontSize: "16px", marginBlock: "20px 8px" }}>
              3. Refunds Processing Time
            </h3>
            <p>
              Once our warehouses receive and check your returned products
              (validating serial numbers/SKUs), refunds are issued within 3-5
              business days. Credit card companies can take up to 7 days to
              credit your balance.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
