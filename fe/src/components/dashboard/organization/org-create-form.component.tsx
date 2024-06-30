"use client"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  organizationDescription: z
    .string()
    .min(1, "Organization description is required"),
})

export const OrgCreateFormComponent = () => {
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      organizationName: "",
      organizationDescription: "",
    },
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id="org-create-form">
        <OrgCreateFormFields />
      </form>
    </FormProvider>
  )
}

export const OrgCreateFormFields = () => {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="organizationName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization Name</FormLabel>
            <FormControl>
              <Input placeholder="A.B.C Org" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="organizationDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization Description</FormLabel>
            <FormControl>
              <Input placeholder="A.B.C Org" {...field} />
            </FormControl>
            <FormDescription>
              Add a short description of your organization.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
