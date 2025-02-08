import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useSignup from "@/hooks/auth/useSignup";
import SpinnerLoader from "@/components/atoms/SpinnerLoader";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const {signupMutateAsync, isLoading} = useSignup();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupMutateAsync(form);
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Sign Up
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="manikmaity@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <SpinnerLoader/> : "Sign Up"}
          </Button>
        </form>
        <Link to="/signin" className="mt-2 text-blue-500 block text-center underline">Sign In</Link>
      </CardContent>
    </Card>
  );
}
