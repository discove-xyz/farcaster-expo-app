import { useEffect, useState, useCallback } from "react";
import { FCProfile } from "@discove/util/types";
import { useAppSharedSupabaseClient } from "./AppShared";

export function useFCProfile(
  username: string | null | undefined
): FCProfile | null {
  const supabaseClient = useAppSharedSupabaseClient();

  const [profile, setProfile] = useState<FCProfile | null>(null);

  const fetchData = useCallback(
    async (u: string) => {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("username", u);

      if (data?.length) setProfile(data[0] as any as FCProfile);
      else setProfile(null);
    },
    [supabaseClient]
  );

  useEffect(() => {
    if (username) fetchData(username);
  }, [username, fetchData]);

  return profile;
}
