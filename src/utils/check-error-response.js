import React from "react";
import { useRouter } from "next/router";
import { logout } from "src/services/authRequests";
import { useSWRConfig } from "swr";

const checkInvalidToken = (msg) => {
  alert(msg)
  const { cache } = useSWRConfig();
  let router = useRouter();
  if (msg === "Invalid token") {
    logout();
    cache.clear();
    router.replace("/login");
  }
};

export default checkInvalidToken;
