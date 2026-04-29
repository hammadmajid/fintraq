"use client"

import { motion, type Variants } from "motion/react"
import { ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
          <TrendingUp className="size-4" />
          Accounting Made Simple
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mb-6 max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
      >
        Financial Control,
        <br />
        <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
          Business Growth
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
      >
        Track expenses, manage budgets, and make smarter financial decisions for your small business. Fintraq gives you the clarity you need to grow.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button size="lg" className="gap-2" render={<Link href="/signup" />}>
          Start Free Trial
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/login" />}>
          Sign In
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-center"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">14 Days</div>
          <div className="text-sm text-muted-foreground">Free Trial</div>
        </div>
        <div className="hidden h-8 w-px bg-border sm:block" />
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">No Credit Card</div>
          <div className="text-sm text-muted-foreground">Required</div>
        </div>
        <div className="hidden h-8 w-px bg-border sm:block" />
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">30 Seconds</div>
          <div className="text-sm text-muted-foreground">To Sign Up</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
