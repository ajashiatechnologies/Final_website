"use client"

import React from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, QrCode } from "lucide-react";
import Image from "next/image";

interface UPIPaymentProps {
  amount: number;
  onPaymentSuccess: (txnId: string) => void;
}

export function UPIPayment({ amount, onPaymentSuccess }: UPIPaymentProps) {
  const [upiId, setUpiId] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [qrCode, setQrCode] = React.useState<string | null>(null);
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  React.useEffect(() => {
    fetchQRCode();
  }, []);

  const fetchQRCode = async () => {
    try {
      const { data: settings, error } = await supabase
        .from('settings')
        .select('upi_qr_code')
        .single();

      if (error) throw error;
      if (settings?.upi_qr_code) {
        setQrCode(settings.upi_qr_code);
      }
    } catch (error: any) {
      console.error('Error fetching QR code:', error.message || error);
    }
  };

  const validateUpiId = (id: string) => {
    // Basic UPI ID validation (e.g., example@upi)
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(id);
  };

  const handlePayment = async () => {
    if (!validateUpiId(upiId)) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random transaction ID
      const txnId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
      
      onPaymentSuccess(txnId);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>UPI Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>

          {qrCode ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-64 w-64">
                <Image
                  src={qrCode}
                  alt="UPI QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Scan QR code to pay ₹{amount.toFixed(2)}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-64 w-64 items-center justify-center rounded-lg border border-dashed">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                QR code not available
              </p>
            </div>
          )}

          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={loading || !upiId}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 