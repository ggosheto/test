"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Leaf, Car, Home, Trash2, Lightbulb, Droplets } from "lucide-react"

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    electricity: "",
    gas: "",
    transportation: "",
    transportType: "car",
    waste: "",
    recycling: "",
    water: "",
  })
  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateFootprint = () => {
    setIsCalculating(true)

    // Simulate calculation delay
    setTimeout(() => {
      const electricity = Number.parseFloat(formData.electricity) || 0
      const gas = Number.parseFloat(formData.gas) || 0
      const transportation = Number.parseFloat(formData.transportation) || 0
      const waste = Number.parseFloat(formData.waste) || 0
      const recycling = Number.parseFloat(formData.recycling) || 0
      const water = Number.parseFloat(formData.water) || 0

      // Carbon footprint calculation (simplified)
      const electricityCarbon = electricity * 0.4 // kg CO2 per kWh
      const gasCarbon = gas * 2.3 // kg CO2 per cubic meter

      let transportCarbon = 0
      switch (formData.transportType) {
        case "car":
          transportCarbon = transportation * 0.2 // kg CO2 per km
          break
        case "bus":
          transportCarbon = transportation * 0.1
          break
        case "train":
          transportCarbon = transportation * 0.05
          break
        case "bike":
          transportCarbon = 0
          break
      }

      const wasteCarbon = waste * 0.5 // kg CO2 per kg waste
      const recyclingReduction = recycling * 0.3 // kg CO2 saved per kg recycled
      const waterCarbon = water * 0.001 // kg CO2 per liter

      const totalCarbon =
        electricityCarbon + gasCarbon + transportCarbon + wasteCarbon + waterCarbon - recyclingReduction
      const monthlyCarbon = totalCarbon * 30
      const yearlyCarbon = totalCarbon * 365

      // Environmental impact metrics
      const treesNeeded = Math.ceil(yearlyCarbon / 22) // Trees needed to offset yearly carbon
      const recyclingImpact = (recycling / waste) * 100 || 0

      setResults({
        daily: totalCarbon.toFixed(2),
        monthly: monthlyCarbon.toFixed(2),
        yearly: yearlyCarbon.toFixed(2),
        treesNeeded,
        recyclingRate: recyclingImpact.toFixed(1),
        breakdown: {
          electricity: electricityCarbon.toFixed(2),
          gas: gasCarbon.toFixed(2),
          transport: transportCarbon.toFixed(2),
          waste: wasteCarbon.toFixed(2),
          water: waterCarbon.toFixed(2),
          recyclingOffset: recyclingReduction.toFixed(2),
        },
      })
      setIsCalculating(false)
    }, 1500)
  }

  const getImpactLevel = (yearlyCarbon: number) => {
    if (yearlyCarbon < 2000) return { level: "Low", color: "text-green-600", bg: "bg-green-100" }
    if (yearlyCarbon < 5000) return { level: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { level: "High", color: "text-red-600", bg: "bg-red-100" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Carbon Footprint Calculator</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate your environmental impact and discover ways to reduce your carbon footprint
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Your Daily Usage</CardTitle>
                <CardDescription>Enter your daily consumption to calculate your carbon footprint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Electricity */}
                <div className="space-y-2">
                  <Label htmlFor="electricity" className="flex items-center gap-2 text-gray-700 font-medium">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Electricity Usage (kWh/day)
                  </Label>
                  <Input
                    id="electricity"
                    type="number"
                    placeholder="e.g., 25"
                    value={formData.electricity}
                    onChange={(e) => handleInputChange("electricity", e.target.value)}
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>

                {/* Gas */}
                <div className="space-y-2">
                  <Label htmlFor="gas" className="flex items-center gap-2 text-gray-700 font-medium">
                    <Home className="w-4 h-4 text-blue-500" />
                    Natural Gas (m³/day)
                  </Label>
                  <Input
                    id="gas"
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.gas}
                    onChange={(e) => handleInputChange("gas", e.target.value)}
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>

                {/* Transportation */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Car className="w-4 h-4 text-purple-500" />
                    Transportation
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={formData.transportType}
                      onValueChange={(value) => handleInputChange("transportType", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-green-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="train">Train</SelectItem>
                        <SelectItem value="bike">Bike/Walk</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="km/day"
                      value={formData.transportation}
                      onChange={(e) => handleInputChange("transportation", e.target.value)}
                      className="border-gray-300 focus:border-green-500"
                    />
                  </div>
                </div>

                {/* Waste */}
                <div className="space-y-2">
                  <Label htmlFor="waste" className="flex items-center gap-2 text-gray-700 font-medium">
                    <Trash2 className="w-4 h-4 text-red-500" />
                    Waste Generated (kg/day)
                  </Label>
                  <Input
                    id="waste"
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.waste}
                    onChange={(e) => handleInputChange("waste", e.target.value)}
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>

                {/* Recycling */}
                <div className="space-y-2">
                  <Label htmlFor="recycling" className="flex items-center gap-2 text-gray-700 font-medium">
                    <Leaf className="w-4 h-4 text-green-500" />
                    Materials Recycled (kg/day)
                  </Label>
                  <Input
                    id="recycling"
                    type="number"
                    placeholder="e.g., 1"
                    value={formData.recycling}
                    onChange={(e) => handleInputChange("recycling", e.target.value)}
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>

                {/* Water */}
                <div className="space-y-2">
                  <Label htmlFor="water" className="flex items-center gap-2 text-gray-700 font-medium">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    Water Usage (liters/day)
                  </Label>
                  <Input
                    id="water"
                    type="number"
                    placeholder="e.g., 150"
                    value={formData.water}
                    onChange={(e) => handleInputChange("water", e.target.value)}
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>

                <Button
                  onClick={calculateFootprint}
                  disabled={isCalculating}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg py-3"
                >
                  {isCalculating ? "Calculating..." : "Calculate My Impact"}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">Your Carbon Footprint</CardTitle>
                  <CardDescription>Environmental impact analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Results */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{results.daily}</div>
                      <div className="text-sm text-gray-600">kg CO₂/day</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{results.monthly}</div>
                      <div className="text-sm text-gray-600">kg CO₂/month</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.yearly}</div>
                      <div className="text-sm text-gray-600">kg CO₂/year</div>
                    </div>
                  </div>

                  {/* Impact Level */}
                  <div className={`p-4 rounded-lg ${getImpactLevel(Number.parseFloat(results.yearly)).bg}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Impact Level:</span>
                      <span className={`font-bold ${getImpactLevel(Number.parseFloat(results.yearly)).color}`}>
                        {getImpactLevel(Number.parseFloat(results.yearly)).level}
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Trees needed to offset:</span>
                      <span className="font-bold text-green-600">{results.treesNeeded} trees</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Recycling rate:</span>
                      <span className="font-bold text-blue-600">{results.recyclingRate}%</span>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Daily Breakdown (kg CO₂):</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Electricity:</span>
                        <span className="font-medium">{results.breakdown.electricity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gas:</span>
                        <span className="font-medium">{results.breakdown.gas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transportation:</span>
                        <span className="font-medium">{results.breakdown.transport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Waste:</span>
                        <span className="font-medium">{results.breakdown.waste}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water:</span>
                        <span className="font-medium">{results.breakdown.water}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Recycling offset:</span>
                        <span className="font-medium">-{results.breakdown.recyclingOffset}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">💡 Tips to Reduce Your Impact:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Switch to renewable energy sources</li>
                      <li>• Use public transportation or bike more</li>
                      <li>• Increase your recycling rate</li>
                      <li>• Reduce water consumption</li>
                      <li>• Choose energy-efficient appliances</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
