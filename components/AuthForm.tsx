"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/(root)/firebase/client"

// UI Components
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"



interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

const signInSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
})

const signUpSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  firstName: z.string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z.string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  preferredName: z.string().optional(),
  profileImage: z.instanceof(File).optional(),
})

const AuthForm = ({ type }: AuthFormProps) => {
  const companyLogo = "/logo-image.jpg" 
  const companyName = "Partner AI"
  const router = useRouter();

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      preferredName: "",
    },
  })

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSignUpSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      
      console.log('User created:', userCredential.user);
      toast.success("Account created successfully! Welcome to Partner AI!");
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || "Failed to create account");
    }
  }

  const onSignInSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      
      console.log('User signed in:', userCredential.user);
      toast.success("Signed in successfully!");
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || "Failed to sign in");
    }
  }

  if (type === 'sign-up') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={companyLogo} 
              alt="Company Logo" 
              className="w-16 h-16 rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {companyName}
          </CardTitle>
          <CardDescription>
            Practice for the job of your dreams!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input {...signUpForm.register("firstName")} />
              {signUpForm.formState.errors.firstName && (
                <p className="text-red-500 text-sm">{signUpForm.formState.errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input {...signUpForm.register("lastName")} />
              {signUpForm.formState.errors.lastName && (
                <p className="text-red-500 text-sm">{signUpForm.formState.errors.lastName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="preferredName">Preferred Name (Optional)</Label>
              <Input {...signUpForm.register("preferredName")} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input {...signUpForm.register("email")} type="email" />
              {signUpForm.formState.errors.email && (
                <p className="text-red-500 text-sm">{signUpForm.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input {...signUpForm.register("password")} type="password" />
              {signUpForm.formState.errors.password && (
                <p className="text-red-500 text-sm">{signUpForm.formState.errors.password.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="profileImage">Profile Image (Optional)</Label>
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  signUpForm.setValue("profileImage", file);
                }}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <img 
            src={companyLogo} 
            alt="Company Logo" 
            className="w-16 h-16 rounded-full"
          />
        </div>
        <CardTitle className="text-2xl font-bold">
          {companyName}
        </CardTitle>
        <CardDescription>
          Welcome back
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input {...signInForm.register("email")} type="email" />
            {signInForm.formState.errors.email && (
              <p className="text-red-500 text-sm">{signInForm.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input {...signInForm.register("password")} type="password" />
            {signInForm.formState.errors.password && (
              <p className="text-red-500 text-sm">{signInForm.formState.errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <div className="text-center mt-4">
            {type === "sign-in" ? (
              <Link href="/sign-up" className="text-blue-600 hover:underline">
                Don't have an account? Sign Up
              </Link>
            ) : (
              <Link href="/sign-in" className="text-blue-600 hover:underline">
                Have an account? Sign In
              </Link>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default AuthForm