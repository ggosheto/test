"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Leaf, Recycle, Globe, Users, Calculator, MessageSquare, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Calculator,
      title: "Impact Calculator",
      description: "Calculate your carbon footprint and environmental impact",
      href: "/calculator",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Join discussions about recycling and sustainability",
      href: "/forum",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: BookOpen,
      title: "Eco Blog",
      description: "Read articles, tips, and news about environmental protection",
      href: "/blog",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const stats = [
    { number: "2.5M", label: "Tons Recycled", icon: Recycle },
    { number: "150K", label: "Active Users", icon: Users },
    { number: "89%", label: "Carbon Reduced", icon: Leaf },
    { number: "50+", label: "Countries", icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Welcome to Chemcycle
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 leading-relaxed">
              Join the global movement for a sustainable future. Recycle smarter, live greener, and protect our planet
              for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-3">
                <Link href="/calculator" className="flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3"
              >
                <Link href="/forum">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-50 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Explore Our Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover powerful tools and resources to help you make a positive environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 ${feature.color}`}
                  >
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6 text-lg">{feature.description}</CardDescription>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Link href={feature.href}>
                      Explore Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">Protecting Our Planet</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  At Chemcycle, we believe that every small action contributes to a larger change. Our platform empowers
                  individuals and communities to make informed decisions about recycling and environmental protection.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-green-500" />
                    Reduce carbon footprint through smart recycling
                  </li>
                  <li className="flex items-center gap-3">
                    <Recycle className="w-5 h-5 text-blue-500" />
                    Promote circular economy principles
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-500" />
                    Build a global community of eco-warriors
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Globe className="w-24 h-24 mx-auto mb-4 animate-pulse" />
                    <p className="text-xl font-semibold">Together for Earth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of eco-conscious individuals who are already making a positive impact on our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-3">
              <Link href="/signup" className="flex items-center gap-2">
                Sign Up Free <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3"
            >
              <Link href="/login">Already a Member?</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
