"use client";
import { useState } from "react";
// Custom Hooks
import { useAuthContext } from "../hooks/useAuthContext";

// Firebase Imports
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = (email, password) => {
    setError(null);
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to create an account. Email already in use.");
        setLoading(false);
      });
  };

  return { error, loading, signup };
};
