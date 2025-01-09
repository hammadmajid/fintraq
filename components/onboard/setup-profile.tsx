"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Camera, Loader2, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { toast } from "@/hooks/use-toast";
import { setName, uploadImage } from "@/actions/onboard";

const FormSchema = z.object({
  name: z.string({
    required_error: "Please enter your name",
  }),
});

interface SetupProfileProps {
  userId: string;
  imageUrl?: string | null;
  name?: string | null;
  redirect?: boolean | null;
}

export function SetupProfile({
  userId,
  imageUrl,
  name,
  redirect,
}: SetupProfileProps) {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name as string,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      await setName(userId, data.name);
      if (redirect) router.push("/onboard/step/default-currency");
    } catch {
      toast({
        title: "Error",
        description: "Failed to change name. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  async function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const image = event.target.files?.[0];
    if (!image) return;

    try {
      const newUrl = await uploadImage(userId, image);
      setAvatarUrl(newUrl);
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={avatarUrl || undefined}
              alt={form.getValues("name")}
              className="rounded-full"
            />
            <AvatarFallback>
              <User2 size={40} />
            </AvatarFallback>
          </Avatar>
          <div>
            <Label htmlFor="avatar-upload" className="cursor-pointer">
              <Button type="button" variant="outline" asChild>
                <span>
                  <Camera className="mr-2 h-4 w-4" /> Change Picture
                </span>
              </Button>
            </Label>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John D." {...field} />
              </FormControl>
              <FormDescription>Full display name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
}
