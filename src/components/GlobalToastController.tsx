import React, { useEffect } from 'react';
import { useToast, Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { toastBridge } from '@/utils/toastBridge';

export function GlobalToastController() {
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = toastBridge.subscribe((event) => {
      if (event.type === 'error') {
        const { title, message } = event.data;
        
        toast.show({
          placement: "top",
          duration: 4000,
          render: ({ id }) => (
            <Toast 
              nativeID={"err-toast-" + id} 
              action="error" 
              variant="solid" 
              className="mx-4 p-4 shadow-lg rounded-xl bg-background-900 border-l-4 border-error-500"
            >
              <VStack space="xs">
                <ToastTitle className="font-semibold text-white">{title}</ToastTitle>
                <ToastDescription className="text-error-200 text-xs">{message}</ToastDescription>
              </VStack>
            </Toast>
          ),
        });
      } else if (event.type === 'success') {
        toast.show({
          placement: "top",
          duration: 2500,
          render: ({ id }) => (
            <Toast 
              nativeID={"success-toast-" + id} 
              action="success" 
              variant="solid" 
              className="mx-4 p-4 shadow-lg rounded-xl bg-background-900 border-l-4 border-success-500"
            >
              <VStack space="xs">
                <ToastTitle className="font-semibold text-white">Success</ToastTitle>
                <ToastDescription className="text-success-200 text-xs">{event.message}</ToastDescription>
              </VStack>
            </Toast>
          ),
        });
      }
    });

    return () => unsubscribe();
  }, [toast]);

  return null;
}