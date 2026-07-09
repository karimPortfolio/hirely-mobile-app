"use client";

import { useApiError } from "@/hooks/useApiError";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  emailVerificationRequest,
  fetchMe,
  forgotPasswordRequest,
  googleOAuth,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  verifyEmailRequest,
} from "../services/auth.service";
import {
  ForgotPasswordCredentials,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
} from "../types";

export function useAuth() {
  const { user, setUser, initialized, setInitialized } = useAuthStore();
  const { error, handleError, clearError } = useApiError();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const data = await fetchMe();
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setInitialized();
    }
  };

  const login = async (credentials: LoginCredentials) => {
    clearError();
    setLoading(true);

    try {
      const response = await loginRequest(credentials);
      if (!response?.accessToken) {
        throw new Error(
          "Account created, but authentication token is missing.",
        );
      }
      await SecureStore.setItemAsync("access_token", response.accessToken);
      router.push("/(tabs)");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    clearError();
    setLoading(true);

    try {
      const response = await registerRequest(credentials);
      if (!response?.accessToken) {
        throw new Error(
          "Account created, but authentication token is missing.",
        );
      }
      await SecureStore.setItemAsync("access_token", response.accessToken);
      router.push("/(tabs)");
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    clearError();
    setLoading(true);
    try {
      await logoutRequest();
      setUser(null);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (
    credentials: ForgotPasswordCredentials,
  ) => {
    clearError();
    setLoading(true);

    try {
      await forgotPasswordRequest(credentials);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (credentials: ResetPasswordCredentials) => {
    clearError();
    setLoading(true);

    try {
      await resetPasswordRequest(credentials);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const resentVerification = async () => {
    clearError();
    setLoading(true);

    try {
      await emailVerificationRequest();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token: string, email: string) => {
    clearError();
    setLoading(true);

    try {
      await verifyEmailRequest(token, email);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const googleSignin = async (idToken: string) => {
    clearError();
    setLoading(true);

    try {
      const response = await googleOAuth(idToken);
      if (!response?.accessToken) {
        throw new Error(
          "Account created, but authentication token is missing.",
        );
      }
      await SecureStore.setItemAsync("access_token", response.accessToken);
      router.push("/(tabs)");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    initialized,
    isAuthenticated: !!user,
    loading,

    login,
    logout,
    fetchUser,
    register,
    requestPasswordReset,
    resetPassword,
    googleSignin,
    verifyEmail,
    resentVerification,

    apiError: error,
    clearApiError: clearError,
  };
}
