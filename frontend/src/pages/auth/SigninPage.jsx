import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SpinnerLoader from "@/components/atoms/SpinnerLoader";
import useSignin from "@/hooks/auth/useSignin";
import { Link, useNavigate } from "react-router-dom";

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const {signinMutateAsync, isLoading, error} = useSignin();
  const navigator = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signinMutateAsync(form);
    navigator("/");
  };


  return (
    <Card className="w-full max-w-md md:p-6 p-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Sign In
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
            {isLoading ?<SpinnerLoader/> : "Sign In"}
          </Button>
        </form>
        <Link to="/signup" className="mt-2 text-blue-500 block text-center underline">Sign Up</Link>
      </CardContent>
    </Card>
  );
}
