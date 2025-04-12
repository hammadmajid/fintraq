import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"
import {SiGithub} from "react-icons/si"
import Link from "next/link"

export default function SettingsLoading() {
    return (
        <div className="flex flex-col justify-between h-full pb-8">
            <main className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Profile Card Skeleton */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Update your profile info.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-20 w-20 rounded-full"/>
                                    <Skeleton className="h-10 w-32"/>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-12"/>
                                    <Skeleton className="h-10 w-full"/>
                                    <Skeleton className="h-4 w-32"/>
                                </div>
                                <Skeleton className="h-10 w-full"/>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Currency Card Skeleton */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Currency</CardTitle>
                            <CardDescription>Change you default currency.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Skeleton className="h-10 w-full"/>
                                </div>
                                <Skeleton className="h-10 w-full"/>
                            </div>
                        </CardContent>
                        <div className="px-6 py-4">
                            <Skeleton className="h-4 w-64"/>
                        </div>
                    </Card>
                </div>

                {/* Delete Account Card Skeleton */}
                <Card>
                    <CardHeader>
                        <CardTitle>Delete account</CardTitle>
                        <CardDescription>Permanently delete your account and remove your data from our
                            servers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-10 w-24"/>
                    </CardContent>
                </Card>
            </main>

            {/* Footer */}
            <div className="text-center">
                <Button variant="link" asChild>
                    <Link href="https://github.com/hammadmajid/fintraq" className="flex gap-2">
                        <SiGithub/>
                        <span>hammadmajid/fintraq</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
