import { Link, useNavigate } from "react-router-dom";
import Github from "../assets/github.svg";
import Google from "../assets/google.svg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Card className="my-10 w-full max-w-sm shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription>Login to continue to your account</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* Social Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="w-full bg-white font-normal text-gray-700 hover:bg-gray-100"
            >
              <img src={Github} className="size-6" />
              Continue with Github
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white font-normal text-gray-700 hover:bg-gray-100"
              onClick={signIn}
            >
              <img src={Google} className="size-6" />
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="border-gray-200 bg-gray-50 transition-colors focus:bg-white"
            />
          </div>

          {/* Password Input */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              className="border-gray-200 bg-gray-50 transition-colors focus:bg-white"
            />
          </div>

          {/* Submit Button */}
          <Button className="mt-2 w-full bg-[#E05D36] text-white shadow-sm hover:bg-[#c9512e]">
            Login
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pb-6 text-center text-sm text-gray-500">
          <div>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#E05D36] underline-offset-4 hover:text-[#c9512e] hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
