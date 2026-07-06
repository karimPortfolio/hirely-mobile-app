import { cn } from "@/lib/utils";
import React from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { Text } from "react-native";
import { VStack } from "../ui/vstack";

interface FieldProps {
  label?: string;
  control: any;
  isRequired?: boolean;
  name: string;
  space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  onRender: ({ ...props }: any) => React.ReactElement;
}

interface FieldLabelProps {
  label?: string;
  isRequired?: boolean;
  children?: React.ReactElement;
}

interface FieldWrapperProps {
  space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  isRequired?: boolean;
  children?: any;
}

interface FieldErrorMessageProps {
  error?: FieldProps["error"];
  children?: any;
}

export const FieldLabel = ({
  label,
  isRequired,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Text> & FieldLabelProps) => {
  if (!label) return null;
  if (children) return children;

  return (
    <Text className={cn("text-foreground/60", className)} {...props}>
      {label} {isRequired && <Text className="text-red-500">*</Text>}
    </Text>
  );
};

export const FieldWrapper = ({
  space,
  className,
  children,
  ...props
}: React.ComponentProps<typeof VStack> & FieldWrapperProps) => {
  return (
    <VStack space={space} className={className} {...props}>
      {children}
    </VStack>
  );
};

export const FieldErrorMessage = ({
  error,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Text> & FieldErrorMessageProps) => {
  if (children) return children;

  const errorMessage = error
    ? typeof error === "string"
      ? error
      : (error as any)?.message
    : null;

  if (!errorMessage) return null;

  return (
    <Text
      className={cn("text-sm text-red-500 font-medium", className)}
      {...props}
    >
      {errorMessage}
    </Text>
  );
};

export const Field = ({
  label,
  control,
  isRequired = false,
  space,
  name,
  error,
  className,
  onRender,
  ...props
}: FieldProps) => {
  return (
    <FieldWrapper space={space || "md"} className={className}>
      <FieldLabel label={label} isRequired={isRequired} />
      <Controller control={control} name={name} render={onRender} {...props} />
      <FieldErrorMessage error={error} />
    </FieldWrapper>
  );
};
