"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Plus,
  Search,
  ThumbsUp,
  MessageCircle,
  Clock,
  User,
  Leaf,
  Recycle,
  Globe,
  Lightbulb,
} from "lucide-react"

interface ForumPost {
  id: number
  title: string
  content: string
  author: string
  category: string
  likes: number
  replies: number
  createdAt: string
  tags: string[]
}

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
  })

  const categories = [
    { id: "all", name: "All Topics", icon: MessageSquare, color: "bg-gray-100 text-gray-600" },
    { id: "recycling", name: "Recycling Tips", icon: Recycle, color: "bg-green-100 text-green-600" },
    { id: "environment", name: "Environment", icon: Globe, color: "bg-blue-100 text-blue-600" },
    { id: "sustainability", name: "Sustainability", icon: Leaf, color: "bg-emerald-100 text-emerald-600" },
    { id: "innovation", name: "Green Tech", icon: Lightbulb, color: "bg-yellow-100 text-yellow-600" },
  ]

  // Sample forum posts
  useEffect(() => {
    const samplePosts: ForumPost[] = [
      {
        id: 1,
        title: "Best practices for plastic recycling at home",
        content:
          "I've been trying to improve my plastic recycling habits. What are some tips you've found effective for sorting and preparing plastics for recycling?",
        author: "EcoWarrior23",
        category: "recycling",
        likes: 24,
        replies: 8,
        createdAt: "2024-01-15T10:30:00Z",
        tags: ["plastic", "home", "sorting"],
      },
      {
        id: 2,
        title: "Solar panel installation - worth the investment?",
        content:
          "Considering installing solar panels on my roof. Has anyone here made the switch? What's been your experience with costs and savings?",
        author: "SolarCurious",
        category: "innovation",
        likes: 31,
        replies: 15,
        createdAt: "2024-01-14T14:20:00Z",
        tags: ["solar", "renewable", "investment"],
      },
      {
        id: 3,
        title: "Community composting programs - how to start one?",
        content:
          "Our neighborhood doesn't have a composting program. I'd love to start one but don't know where to begin. Any advice from those who've done this?",
        author: "GreenNeighbor",
        category: "sustainability",
        likes: 18,
        replies: 12,
        createdAt: "2024-01-13T09:15:00Z",
        tags: ["composting", "community", "organic"],
      },
      {
        id: 4,
        title: "Electric vehicles vs hybrid - environmental impact comparison",
        content:
          "I'm in the market for a new car and want to make the most environmentally conscious choice. What are your thoughts on EVs vs hybrids?",
        author: "CarShopper2024",
        category: "environment",
        likes: 42,
        replies: 23,
        createdAt: "2024-01-12T16:45:00Z",
        tags: ["electric", "hybrid", "transportation"],
      },
      {
        id: 5,
        title: "Zero waste lifestyle - realistic or too extreme?",
        content:
          "I've been reading about zero waste living. It sounds amazing but also overwhelming. Has anyone successfully transitioned to this lifestyle?",
        author: "MinimalistMom",
        category: "sustainability",
        likes: 35,
        replies: 19,
        createdAt: "2024-01-11T11:30:00Z",
        tags: ["zero-waste", "lifestyle", "minimalism"],
      },
      {
        id: 6,
        title: "DIY eco-friendly cleaning products that actually work",
        content:
          "Sharing my favorite homemade cleaning recipes that are both effective and environmentally safe. What are your go-to green cleaning solutions?",
        author: "CleanGreenQueen",
        category: "sustainability",
        likes: 28,
        replies: 14,
        createdAt: "2024-01-10T13:20:00Z",
        tags: ["cleaning", "diy", "non-toxic"],
      },
    ]
    setPosts(samplePosts)
  }, [])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmitPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post: ForumPost = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: "You",
        category: newPost.category,
        likes: 0,
        replies: 0,
        createdAt: new Date().toISOString(),
        tags: [],
      }
      setPosts([post, ...posts])
      setNewPost({ title: "", content: "", category: "general" })
      setShowNewPostForm(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.icon : MessageSquare
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "bg-gray-100 text-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Community Forum</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with like-minded individuals, share experiences, and learn from the community
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* New Post Button */}
              <Button
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-green-500"
                />
              </div>

              {/* Categories */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{category.name}</span>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Posts</span>
                    <span className="font-bold text-green-600">{posts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-bold text-blue-600">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-bold text-purple-600">89 posts</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* New Post Form */}
              {showNewPostForm && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                    <CardDescription>Share your thoughts with the community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                      className="border-gray-300 focus:border-green-500"
                    />
                    <Textarea
                      placeholder="What's on your mind?"
                      value={newPost.content}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                      className="min-h-32 border-gray-300 focus:border-green-500"
                    />
                    <div className="flex justify-between">
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost((prev) => ({ ...prev, category: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:border-green-500"
                      >
                        <option value="general">General</option>
                        <option value="recycling">Recycling</option>
                        <option value="environment">Environment</option>
                        <option value="sustainability">Sustainability</option>
                        <option value="innovation">Green Tech</option>
                      </select>
                      <div className="space-x-2">
                        <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmitPost} className="bg-gradient-to-r from-green-500 to-blue-500">
                          Post
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Posts */}
              <div className="space-y-4">
                {filteredPosts.map((post) => {
                  const CategoryIcon = getCategoryIcon(post.category)
                  return (
                    <Card
                      key={post.id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${getCategoryColor(post.category)}`}>
                              <CategoryIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors">
                                {post.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {post.author}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatDate(post.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>

                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm font-medium">{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">{post.replies} replies</span>
                            </button>
                          </div>
                          <Badge variant="outline" className={getCategoryColor(post.category)}>
                            {categories.find((cat) => cat.id === post.category)?.name || post.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredPosts.length === 0 && (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filter</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
