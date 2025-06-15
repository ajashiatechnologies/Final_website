"use client"

interface EmailTemplate {
  subject: string
  html: string
  text: string
}

interface EmailData {
  to: string
  template: string
  data: Record<string, any>
}

const emailTemplates: Record<string, EmailTemplate> = {
  orderConfirmation: {
    subject: "Order Confirmation - #{orderNumber}",
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order #{orderNumber} has been confirmed and is being processed.</p>
      <h2>Order Details:</h2>
      <ul>
        {{#items}}
        <li>{{name}} - ${{ price }} x {{quantity}}</li>
        {{/items}}
      </ul>
      <p><strong>Total: ${{ total }}</strong></p>
    `,
    text: "Thank you for your order! Your order #{orderNumber} has been confirmed.",
  },
  orderShipped: {
    subject: "Your order has shipped - #{orderNumber}",
    html: `
      <h1>Your order is on its way!</h1>
      <p>Your order #{orderNumber} has been shipped.</p>
      <p>Tracking Number: {{trackingNumber}}</p>
      <p>Expected Delivery: {{expectedDelivery}}</p>
    `,
    text: "Your order #{orderNumber} has been shipped. Tracking: {{trackingNumber}}",
  },
  lowStock: {
    subject: "Low Stock Alert - {{productName}}",
    html: `
      <h1>Low Stock Alert</h1>
      <p>Product "{{productName}}" is running low on stock.</p>
      <p>Current Stock: {{currentStock}}</p>
      <p>Minimum Stock Level: {{minStock}}</p>
    `,
    text: "Low stock alert for {{productName}}. Current stock: {{currentStock}}",
  },
}

export class EmailService {
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // In a real implementation, this would integrate with an email service like SendGrid, Mailgun, etc.
      console.log("Sending email:", emailData)

      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return true
    } catch (error) {
      console.error("Failed to send email:", error)
      return false
    }
  }

  static async sendOrderConfirmation(orderData: any): Promise<boolean> {
    return this.sendEmail({
      to: orderData.customerEmail,
      template: "orderConfirmation",
      data: orderData,
    })
  }

  static async sendOrderShipped(orderData: any): Promise<boolean> {
    return this.sendEmail({
      to: orderData.customerEmail,
      template: "orderShipped",
      data: orderData,
    })
  }

  static async sendLowStockAlert(productData: any): Promise<boolean> {
    return this.sendEmail({
      to: "admin@ajashia.com",
      template: "lowStock",
      data: productData,
    })
  }
}
