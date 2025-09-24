import { useCallback, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/auth/auth"

const schema = z.object({ email: z.string().email() })

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  })
  const onSubmit = useCallback(async (data: z.infer<typeof schema>) => {
    setError(undefined)
    setSuccess(undefined)
    const res = await resetPassword(data.email)
    if (res.ok) setSuccess("Reset email sent")
    else setError(res.error)
  }, [resetPassword])
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Send reset link</Button>
            {error ? <div className="text-sm text-center text-red-600">{error}</div> : null}
            {success ? <div className="text-sm text-center text-green-600">{success}</div> : null}
          </form>
        </Form>
      </div>
    </div>
  )
}


