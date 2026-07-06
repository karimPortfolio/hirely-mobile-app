import { Button, ButtonSpinner, ButtonText } from "../ui/button";

interface LoadingButtonProps {
  isLoading: boolean;
  onPress: () => void;
  label: string;
  loadingLabel?: string;
  size?: "sm" | "lg";
  children?: React.ReactNode;
}

export function LoadingButton({
  isLoading,
  onPress,
  label,
  size,
  loadingLabel,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button> & LoadingButtonProps) {
  if (isLoading) {
    return (
      <Button size={size} className={className} isDisabled={true} {...props}>
        <ButtonSpinner />
        <ButtonText className="text-md">
          {loadingLabel || "Please wait..."}
        </ButtonText>
      </Button>
    );
  }

  return (
    <Button size={size} className={className} onPress={onPress} {...props}>
      {!children && <ButtonText className="text-md">{label}</ButtonText>}
      {children && children}
    </Button>
  );
}
