import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account succesfully created! A verification email was sent to the user's email address"
      );
    },
  });

  return { signup, isLoading };
}
