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
    username: z.string().min(2).max(50),
    email: z.string().email(), // Ensure the email is in a valid email format
    password: z.string().min(8), // Ensure the password is at least 8 characters long

})

export default function Page() {

    // const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // try {
        //     const response = await axios.post("api/users/signup", values)
        //     console.log(response.data);
        //     router.push("/login")
        // } catch (error: any) {
        //     console.log(error.message);
        // }
        console.log(values);
        
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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
                            <Button className='w-full tracking-wider' type="submit">CREATE ACCOUNT</Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className='flex-col gap-3'>
                    <p>Have an Account? <Link href={"/login"}>LOGIN</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}