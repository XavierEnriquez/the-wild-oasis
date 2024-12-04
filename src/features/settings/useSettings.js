import { useQuery } from "@tanstack/react-query";
import { getSettingsFn } from "../../services/apiSettings";

export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsFn,
  });
  return { settings, isLoading, error };
}
