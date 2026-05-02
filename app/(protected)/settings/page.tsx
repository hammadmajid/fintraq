"use client"

import { useSession } from "@/lib/auth-client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Settings, User, Lock, Palette, Bell, CreditCard } from "lucide-react"
import { format } from "date-fns"

export default function SettingsPage() {
  const session = useSession()
  const user = session?.data?.user

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Settings className="size-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Tabs Container */}
      <Tabs defaultValue="profile" className="w-full" orientation="horizontal">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="size-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Lock className="size-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="size-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="size-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="size-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                View your profile details. Edit functionality coming soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {user?.name || "Not provided"}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {user?.email || "Not provided"}
                </div>
              </div>

              {/* Avatar/Image URL Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Avatar
                </label>
                {user?.image ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt="Avatar"
                      className="size-12 rounded-full border border-input"
                    />
                    <div className="flex h-10 flex-1 items-center rounded-md border border-input bg-background px-3 py-2 text-sm break-all">
                      {user.image}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
                    No avatar set
                  </div>
                )}
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Bio
                </label>
                <div className="flex min-h-20 items-start rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {user?.emailVerified
                    ? "Bio feature coming soon"
                    : "Complete email verification to set bio"}
                </div>
              </div>

              {/* Joined Date Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Member Since
                </label>
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {user?.createdAt
                    ? format(new Date(user.createdAt), "MMMM d, yyyy")
                    : "Not available"}
                </div>
              </div>

              {/* Email Verification Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Verification
                </label>
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <span
                    className={
                      user?.emailVerified
                        ? "font-medium text-green-600 dark:text-green-400"
                        : "font-medium text-amber-600 dark:text-amber-400"
                    }
                  >
                    {user?.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Lock className="size-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Account settings is under construction
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check back soon for password management and security options.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Palette className="size-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Appearance settings is under construction
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Theme, language, and display preferences coming soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Bell className="size-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Notification settings is under construction
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage email, push, and in-app notification preferences.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <CreditCard className="size-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Billing settings is under construction
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Payment methods, invoices, and subscription management coming
                  soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
