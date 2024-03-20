"use client"

import { z } from "zod"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

const formSchema = z.object({
    email: z.string().email(), // Ensure the email is in a valid email format
    password: z.string().min(8), // Ensure the password is at least 8 characters long
})


export default function page() {

    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post("api/users/login", values)
            router.push("/")
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>

                    <h3>Welcome back to ECOMMERCE</h3>
                    <p>The next gen business marketplace</p>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter" type="password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='w-full tracking-wider' type="submit">LOGIN</Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className='flex-col gap-3'>
                    <p>Don't have an Account? <Link href={"/signup"}>SIGN UP</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}