"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z.string().email("Please enter a valid email address"),
  interest: z
    .string()
    .min(10, "Please provide at least 10 characters")
    .max(500),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      interest: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("something went wrong", {
        description: "Your message could not be sent. Try again.",
      });
      return;
    }

    toast.success("Message sent!", {
      description: "Your request has been delivered successfully.",
    });

    form.reset();
  };

  return (
    <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 text grid gap-8 lg:gap-12 md:grid-cols-2">
      <div className="md:px-4 lg:pb-8 md:h-full w-full flex flex-col justify-between gap-2">
        <div className="flex flex-col gap-2 md:max-w-md">
          <h1 className="text-3xl lg:text-4xl">
            Let’s discuss your backend needs
          </h1>
          <p className="md:text-lg text-foreground-lighter">
            Request a personalized demo to understand how DotPortion can support
            your workflows, automation, and backend development at scale.
          </p>
          <p className="md:text-lg text-foreground-lighter">
            I’ll personally help you decide if DotPortion is the right fit.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[300px]">
        <div className="border rounded-xl bg-surface-75 p-4 md:p-6 w-full lg:max-w-lg min-h-[200px] md:min-h-[400px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col lg:grid lg:grid-cols-2 gap-4"
            >
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-full gap-y-2 md:col-span-1">
                    <FormLabel className="text-sm text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground-light flex justify-between">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="flex w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background-control focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-2 h-[34px]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-full gap-y-2 md:col-span-1">
                    <FormLabel className="text-sm text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground-light flex justify-between">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="flex w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background-control focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-2 h-[34px]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-full gap-y-2">
                    <FormLabel className="text-sm text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground-light flex justify-between">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="flex w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background-control focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-2 h-[34px]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              {/* Interest / Message */}
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-full gap-y-2 [&_textarea]:min-h-[100px] [&_textarea]:bg-foreground/[.026]">
                    <FormLabel className="text-sm text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground-light flex justify-between">
                      What are you insterested in?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="flex min-h-10 w-full rounded-md border border-control focus:border-control px-3 py-2 text-base md:text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background-control focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:opacity-50 bg-control"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <div className="shrink-0 bg-neutral-200 dark:bg-neutral-800 h-px w-full col-span-full" />

              <button
                type="submit"
                className="relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-black dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-300 text-white dark:text-black border-neutral-800 dark:border-neutral-300  focus-visible:outline-brand-600 data-[state=open]:bg-brand-400/80 dark:data-[state=open]:bg-brand-500/80 data-[state=open]:outline-brand-600 w-full flex items-center justify-center text-sm leading-4 px-3 py-2 h-[34px] col-span-full"
              >
                Request a demo
              </button>
              <p className="text-neutral-500 text-sm col-span-full">
                By submitting this form, I confirm that I have read and
                understood the{" "}
                <Link
                  className="text-foreground hover:underline"
                  href={"/privacy"}
                >
                  Privacy Policy
                </Link>
              </p>
            </form>
          </Form>
        </div>

        <p className="text-neutral-500 text-sm">
          <a className="text-foreground hover:underline" href="">
            Contact support
          </a>{" "}
          if you need technical help
        </p>
      </div>
    </div>
  );
}
