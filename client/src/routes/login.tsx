import React from "react";
import { loginInteralUser, loginUser } from "@/api/requests";
import { LoginRequest } from "@/api/types/request";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { LoadingSpinner } from "@/components/loading-spinner";

export const LoginForm: React.FC = () => {
  const { toast } = useToast();

  const initialValues: LoginRequest = {
    email: "",
    password: "",
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      Cookies.set("cf-jwt-cookie", response.data.token);

      // Redirect to home page
      const origin = window.location.origin;
      window.location.href = `${origin}`;
    },
    onError: (error) => {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message,
      });
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <div className="flex flex-col gap-4 items-center">
      <Card className="flex flex-col gap-8 p-6 lg:p-10 w-[28rem] rounded-2xl">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm">Enter credentials to continue.</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <Input
                id="email"
                placeholder="Email Address"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <Button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
      </Card>
      <LoginInternalUser />
    </div>
  );
};

export const LoginInternalUser: React.FC = () => {
  const loginMutation = useMutation({
    mutationFn: loginInteralUser,
    onSuccess: (response) => {
      Cookies.set("cf-jwt-cookie", response.data.token);

      // Redirect to home page
      const origin = window.location.origin;
      window.location.href = `${origin}`;
    },
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      loginMutation.mutate();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <LoadingSpinner message={"Checking VPC access..."} />
    </div>
  );
};
