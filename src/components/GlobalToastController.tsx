import { Toast, ToastDescription, useToast } from "@/components/ui/toast";
import { toastBridge } from "@/utils/toastBridge";
import { useEffect } from "react";

export function GlobalToastController() {
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = toastBridge.subscribe((event) => {
      const data = event.data;
      if (event.type === "error") {
        toast.show({
          placement: "top",
          duration: 4000,

          render: ({ id }) => (
            <Toast
              nativeID={`err-toast-${id}`}
              action="error"
              variant="outline"
              className="border-destructive bg-red-200 dark:bg-red-950 w-full shadow-hard-5 flex-row justify-between"
            >
              <ToastDescription className="text-red-500 dark:text-red-200 font-medium">
                {data?.message ||
                  "An unxpected error occured. Please try again later."}
              </ToastDescription>
            </Toast>
          ),
        });
      } else if (event.type === "success") {
        toast.show({
          placement: "top",
          duration: 2500,
          render: ({ id }) => (
            <Toast
              nativeID={`success-toast-${id}`}
              action="success"
              variant="outline"
              className="border-green-500 bg-green-100 dark:bg-green-900 w-full shadow-hard-5 flex-row justify-between"
            >
              <ToastDescription className="text-green-500 dark:text-green-200 font-medium">
                {data?.message || "Request completed successfully"}
              </ToastDescription>
            </Toast>
          ),
        });
      }
    });

    return () => unsubscribe();
  }, [toast]);

  return null;
}
