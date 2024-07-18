import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  checkAuth,
  checkToken,
  getStudentDetails,
} from "src/services/authRequests";

export function useAuth({ redirectTo = "", redirectIfFound = false } = {}) {

  const {
    data: user,
    mutate,
    isValidating,
    error,
  } = useSWR("auth_user", getStudentDetails);

  const router = useRouter();

  //console.log(user);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    //alert('useEffect')
    if (!redirectTo && !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo, router]);

  return {
    user,
    mutate,
    isValidating,
    isLoading: !user && !error,
  };
}
